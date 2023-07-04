import { LightningElement,track,wire } from 'lwc';
import getAllAccountData from '@salesforce/apex/AccountsController.getAccounts';
import { getPicklistValues } from 'lightning/uiObjectInfoApi'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { NavigationMixin } from 'lightning/navigation';

 
const columns = [
        {
            label: 'Name',
            fieldName: 'recLink',
            type: 'url',
            sortable: true,
            typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
        },
        { label: 'Country', fieldName: 'BillingCountry', type: 'text',sortable: true },
        { label: 'Website', fieldName: 'Website', type: 'url',sortable: true },
        { label: 'Industry', fieldName: 'Industry', type: 'text',sortable: true },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' ,sortable: true},
    ];

export default class memberSearch extends NavigationMixin(LightningElement) {
   
    
    showTable = true;
    @track datatable;
    @track columns = columns;
    @track defaultSortDirection = 'asc';
    @track sortBy;
    @track sortDirection;
    @track recordCount;
    
    @track countrykey;
    @track nameKey;
    @track value;
    @track optionsMaster=[];

    @track errorFlag = false;
    @track value;
    @track allValues=[];


    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountMetadata;
    
    @wire(getPicklistValues, { recordTypeId: '$accountMetadata.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD})
    industryPicklist;

    @wire(getAllAccountData)
    wiredAccData({ error, data }) {
        if (data) {
            console.log(data);
            this.accounts = data;
            let parseData = JSON.parse(JSON.stringify(data));
            
            parseData.forEach(res => {
                res.recLink = '/' + res.Id;
            });

            this.datatable =parseData;
            this.showTable = true;

            this.recordCount = this.datatable.length;
            this.initialRecords = this.datatable;
            this.error = undefined;

        } else if (error) {
            this.error = error;
            this.datatable = undefined;
            this.showTable = false;
        }
    }

    handleCountryInput(event){
        this.countrykey = event.target.value;
        console.log(this.countrykey);
    }

    handleInstitutionKeyInput(event){
        this.InstitutionKey = event.target.value;
        console.log(this.InstitutionKey);
    }

    handleNameInput(event){
        this.nameKey = event.target.value;
        console.log(this.nameKey);
    }

    handleSortTableData(event) {       
        this.sortBy = event.detail.fieldName;       
        this.sortDirection = event.detail.sortDirection;       
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortData(fieldname, direction) {
        
        let parseData = JSON.parse(JSON.stringify(this.datatable));
       
        let keyValue = (a) => {
            return a[fieldname];
        };


       let isReverse = direction === 'asc' ? 1: -1;

           parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
           
            return isReverse * ((x > y) - (y > x));
        });
        
        this.datatable = parseData;

    }

    handleClearFilters(event)
    {
        this.datatable = this.initialRecords;
        this.recordCount = this.datatable.length; 
        this.nameKey ='';
        this.value='';
        this.countrykey = '';
        this.allValues = [];
    }

    handleApplyFilters(){
        console.log('@@@in handleApplyFilters');

       
        this.fulldata = this.initialRecords;

        if (this.fulldata) {
            
            let FilteredAccRecs = [];
            
            for (let record of this.fulldata) {
                
                
                var isIndustryFound = false;
                var isNameFound = false;
                var isCountryFound = false;

              if(record.Name != undefined && this.nameKey != undefined){

                    let nameKey = this.nameKey.toLowerCase();
                    
                    if (record.Name.toLowerCase().indexOf(nameKey) > -1 ){
                        
                        isNameFound = true;

                    }
                }

                if(record.BillingCountry != undefined && this.countrykey != undefined){

                    let strCountryKey = this.countrykey.toLowerCase();
                    
                    if (record.BillingCountry.toLowerCase().indexOf(strCountryKey) > -1 ){
                        
                        isCountryFound = true;

                    }
                }    

                if(record.Industry != undefined && this.allValues.length > 0){
                    
                    for (let searchVal of this.allValues) {

                        let strIndustryKey = searchVal.toLowerCase();
                        if (record.Industry.toLowerCase().indexOf(strIndustryKey) > -1 ){
                            isIndustryFound = true;
                        }
                    }
                }
                
                console.log(isNameFound+'------'+isIndustryFound+'-----'+isCountryFound);

                if(isNameFound == true || isIndustryFound == true || isCountryFound == true ){
                    FilteredAccRecs.push(record);
                }
     
            }

            this.datatable = FilteredAccRecs;
            this.recordCount = this.datatable.length;
            console.log('@@@:'+this.recordCount);
            

            if(this.recordCount < 1){
                this.errorFlag= true;
                
            }
        }else {
            this.datatable = this.initialRecords;
            this.recordCount = this.datatable.length;
        }
        
    }

    

   
    handleIndustryChange(event){
        this.value=event.target.value;

        if(!this.allValues.includes(this.value))
            this.allValues.push(this.value);
        this.modifyOptions();
    }

    handleRemovePill(event){
        this.value='';
        const valueRemoved=event.target.name;
        this.allValues.splice(this.allValues.indexOf(valueRemoved),1);
        this.modifyOptions();
    }

    modifyOptions(){
        this.options=this.optionsMaster.filter(elem=>{
        if(!this.allValues.includes(elem.value))
            return elem;
        })
    }

}
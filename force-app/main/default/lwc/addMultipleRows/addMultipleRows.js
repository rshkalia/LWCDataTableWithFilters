import { LightningElement,api,track,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import objAccount from '@salesforce/schema/Account';
import AccountSource from '@salesforce/schema/Account.AccountSource';


//import MAB_Application__c from '@salesforce/schema/MAB_Application__c';
//import Biological_Diversity_Conservation from '@salesforce/schema/MAB_Application__c.MAB_Biological_Diversity_Conservation__c';


export default class AddMultipleRows extends LightningElement {

    keyIndex = 0;
    @track valuesList = [{}];
    filesUploaded = [];

    @api field1Label;
    @api field2Label;
    @api additionalFreeTextLabel;
    @api AttachementFileLabel;


    @api get sectionInfos() {
        return this.valuesList;
    }

    set sectionInfos(value) {
        this.setAttribute('sectionInfos', value);
        this.valuesList = JSON.parse(JSON.stringify(value));
        console.log('**********'+JSON.stringify(this.valuesList));
        //this.handleValueChange(value);
    }
 

    @api isBiologicalDiversityPicklist;
    @api isAdditionalFreeTextExist;

    @api isAttachedFilesExist;
    @api sectionName;
   

    @api pickslistValues;

    get acceptedFormats() {
        return ['.pdf','.png','.jpg','.shp'];
    }
    
    get isFileUpload(){
        if(typeof this.isAttachedFilesExist == 'string'){
            return this.isAttachedFilesExist == 'true';
        }else{
            return this.isAttachedFilesExist;
        }
    } 

    @wire(getObjectInfo, { objectApiName: objAccount })
    mabApplicationMetadata;

    @wire(getPicklistValues, {
            recordTypeId: '$mabApplicationMetadata.data.defaultRecordTypeId', 
            fieldApiName: AccountSource
        })
   accSourcePickslit;

 



   get currentPickslitValues(){
        return this.accSourcePickslit;
    }

    connectedCallback(){
        if(JSON.stringify(this.valuesList[0]) === '{}'){

            this.valuesList[this.keyIndex].id = this.keyIndex;
            this.valuesList[this.keyIndex].sectionName = this.sectionName;
        }
    }


    handlePicklistChange(event) {
        this.valuesList[this.keyIndex].field1value = event.detail.value;
        this.sectionInfosEvent();
        console.log('@@@handlePicklistChange');
        console.log(this.valuesList);
    }

    handleChangeVal(event){

        this.valuesList[this.keyIndex].field2value = event.detail.value;
        this.sectionInfosEvent();
        console.log('@@@handleChangeVal');
        console.log(this.valuesList);


    }

    handleAdditionalFreeTextChange(event){
        this.valuesList[this.keyIndex].additionalFreeText = event.detail.value;
        this.sectionInfosEvent();
    }


    addRow() {
        ++this.keyIndex;
        this.valuesList = this.valuesList.concat({id : this.keyIndex});
        this.valuesList[this.keyIndex].id = this.keyIndex;
        this.valuesList[this.keyIndex].sectionName = this.sectionName;
        this.sectionInfosEvent();
    }


    removeRow(event) {
        if (this.valuesList.length >= 2) {
            this.valuesList = this.valuesList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
            this.sectionInfosEvent();
        }
    }

     handleFilesChanges(event) {
        let files = event.target.files;
        this.filesUploaded = [];
        this.valuesList[this.keyIndex].fileNames = '';
        console.log('@@@files:');
        console.log(files);
        console.log(files.length);
        
        if (files.length > 0) {
            let filesName = '';
            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                filesName = filesName + file.name + ', ';

                let freader = new FileReader();
                freader.onload = f => {
                    let base64 = 'base64,';
                    let content = freader.result.indexOf(base64) + base64.length;
                    let fileContents = freader.result.substring(content);
                    this.filesUploaded.push({
                        title: file.name,
                        versionData: fileContents
                    });
                    this.valuesList[this.keyIndex].filesUploaded = this.filesUploaded;
                    this.valuesList[this.keyIndex].fileNames = filesName;
                    this.sectionInfosEvent();
                };
               
                freader.readAsDataURL(file);
                console.log('fin ');
                console.log(this.valuesList);
            }
          
        }
      
   
    }

  

    sectionInfosEvent(){
        const sectionDetailsEvent = new CustomEvent("sectiondetailschange", {
            detail:  JSON.stringify(this.valuesList)
            });
        this.dispatchEvent(sectionDetailsEvent);
    }


    handleSaveForm(){
        console.log('@@@handleSaveForm ');
        console.log(this.valuesList);
            
    }
        
}
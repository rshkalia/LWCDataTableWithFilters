import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountsController.getAccounts';


const columns = [
    { label: 'Account Name', fieldName: 'Name',type: 'text' },
    { label: 'Website', fieldName: 'Website', type: 'url' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Is Active', fieldName: 'test__c', type: 'boolean' },
    { label: 'Number Of Employees', fieldName: 'NumberOfEmployees', type: 'number' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
];

const operationsForDateAndNumbers = [
    { label: 'equals', value: 'equals' },
    { label: 'not equal to', value: 'not equal to' },
    { label: 'less than', value: 'less than' },
    { label: 'greater than', value: 'greater than' },
    { label: 'less or equal', value: 'less or equal' },
    { label: 'greater or equal', value: 'greater or equal' },
];

const operationsForText = [
    { label: 'equals', value: 'equals' },
    { label: 'not equal to', value: 'not equal to' },
    { label: 'less than', value: 'less than' },
    { label: 'greater than', value: 'greater than' },
    { label: 'less or equal', value: 'less or equal' },
    { label: 'greater or equal', value: 'greater or equal' },
    { label: 'contains', value: 'contains' },
    { label: 'does not contain', value: 'does not contain' },
    { label: 'starts with', value: 'starts with' },
];

const operationsForBoolean = [
    { label: 'equals', value: 'equals' },
    { label: 'not equal to', value: 'not equal to' },
];

const booleanSearchValueOptions = [
    { label: 'true', value: 'true' },
    { label: 'false', value: 'false' },
];

var indexFrom;
var indexTo;
export default class DataTableWithFilters extends LightningElement 
{
    @track bufferData = [];
    @track data = [];
    @track filters = [];
    @track operatorOptions = [];
    columns = columns;
    booleanSearchValueOptions = booleanSearchValueOptions;
    showTable = false;
    showFilterModal = false;
    showAddFilterLogicModal = false;
    islogicFilterValueChanged = false;
    fieldValue = columns[0].fieldName;
    operatorValue;
    searchValue;
    logicFilterValueTemp;
    logicFilterValue;
    fieldNameToTypeMap = new Map();
    fieldNameToLabelMap = new Map();
    dateInput;
    booleanInput;
    otherInput;
    indexOfEditFilterBox;
    callingFromAddFilter = true;
    isFilterListEmpty = true;
    isDataListEmpty = true;

    // Get property for field options using available columns
    //------------------------------------------------------------------------------------------------------------------------------
    get fieldOptions() {
        var fieldOptions=[];
        for(var index=0;index<columns.length;index++)
        {
            fieldOptions.push({
                label: columns[index].label, 
                value: columns[index].fieldName                
            }); 
            this.fieldNameToTypeMap.set(columns[index].fieldName,columns[index].type);
            this.fieldNameToLabelMap.set(columns[index].fieldName,columns[index].label);
        }
        return fieldOptions;
    }

    // Get account data from server side
    //------------------------------------------------------------------------------------------------------------------------------
    @wire(getAccounts, {})
    getAccounts(result) 
    {
        if (result.data) 
        {       
            //Method calling to assign opreator options according to field type
            this.assignOperatorOptions(columns[0].type);

            this.isDataListEmpty = false;                                     
            this.data=JSON.parse(JSON.stringify(result.data)); 
            this.bufferData = JSON.parse(JSON.stringify(result.data));   
            this.showTable = true;                 
        } 
        else if (result.error) 
        {           
           this.isDataListEmpty = true;
           this.error = result.error; 
           this.showTable = true;          
        }
    }
    
    // Add filter modal related functions
    //------------------------------------------------------------------------------------------------------------------------------
    handleAddFilter(event)
    {
        this.showFilterModal = !this.showFilterModal;
        this.callingFromAddFilter = true;
        if(this.showFilterModal)
        {
            this.fieldValue = columns[0].fieldName;
            this.operatorValue = 'equals';
            this.searchValue = '';

            //Method calling to assign opreator options according to field type
            this.assignOperatorOptions(columns[0].type);
        }
    }

    handleFieldChange(event)
    {
        this.fieldValue = event.detail.value;
        this.operatorValue = 'equals';
        this.searchValue = '';

        //Method calling to assign opreator options according to field type
        this.assignOperatorOptions(this.fieldNameToTypeMap.get(event.detail.value));
    }

    handleOperatorChange(event)
    {
        this.operatorValue = event.detail.value;
    }

    handleSearchValueChange(event)
    {        
        this.searchValue = event.detail.value;  
    }

    handleCancel(event)
    {
        this.showFilterModal = false;
    }

    handleDone(event)
    {
        this.showFilterModal = false;
        this.filters.push({
            id:this.createUuid(),
            label:this.fieldNameToLabelMap.get(this.fieldValue),
            field:this.fieldValue, 
            operator:this.operatorValue,                
            searchValue:this.searchValue            
        });
        
        if(this.logicFilterValueTemp && this.logicFilterValue != this.logicFilterValueTemp)
        {
            this.logicFilterValue = this.logicFilterValueTemp;
        }
        else
        {
            //Method calling to make default filter logic
            this.makeDefaultFilterLogic();
        }
        this.isFilterListEmpty = false;        
    }

    createUuid() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    // Edit filter modal related functions
    //------------------------------------------------------------------------------------------------------------------------------
    handleEditFilter(event)
    {
        this.showFilterModal = !this.showFilterModal;
        this.callingFromAddFilter = false;
        this.indexOfEditFilterBox = event.target.dataset.id;                 

        this.fieldValue = this.filters[event.target.dataset.id].field;
        this.operatorValue = this.filters[event.target.dataset.id].operator;
        this.searchValue = this.filters[event.target.dataset.id].searchValue;
        
        //Method calling to assign opreator options according to field type
        this.assignOperatorOptions(this.fieldNameToTypeMap.get(this.filters[event.target.dataset.id].field));
    }

    handleDone1(event)
    {        
        this.showFilterModal = false;
        this.filters[this.indexOfEditFilterBox].label = this.fieldNameToLabelMap.get(this.fieldValue)
        this.filters[this.indexOfEditFilterBox].field = this.fieldValue;
        this.filters[this.indexOfEditFilterBox].operator = this.operatorValue;
        this.filters[this.indexOfEditFilterBox].searchValue = this.searchValue;        
    }

    handleFilterRemove(event)
    {        
        this.filters.splice(event.target.name, 1);
        if(this.filters==null || this.filters.length==0)
        {
            this.filters = [];
            this.isFilterListEmpty = true;
            this.isDataListEmpty = false;
            this.data = this.bufferData;
            this.logicFilterValueTemp = '';
            this.logicFilterValue = '';
        }
        else
        {
           //Method calling to make default filter logic
            this.makeDefaultFilterLogic();
        }
    }

    // Add filter logic related functions
    //------------------------------------------------------------------------------------------------------------------------------
    handleAddFilterLogic(event)
    {
        if(this.filters.length>0)
        { 
            this.showAddFilterLogicModal = !this.showAddFilterLogicModal;
        }
    }  
      
    handleLogicFilterValueChange(event)
    {
        this.logicFilterValueTemp = event.detail.value;
    }

    handleAddFilterLogicModalCancel(event)
    {
        this.showAddFilterLogicModal = false;
        this.logicFilterValueTemp = this.logicFilterValue;
    }

    handleAddFilterLogicModalDone(event)
    {
        this.showAddFilterLogicModal = false;
        
        if((this.logicFilterValueTemp=='' || this.logicFilterValueTemp==null) 
            && (this.filters!=null || this.filters.length!=0))
        {
            //Method calling to make default filter logic
            this.makeDefaultFilterLogic();
        }
        else
        {
            this.logicFilterValue = this.logicFilterValueTemp;
        }         
    }    

    // Clear all filters 
    //------------------------------------------------------------------------------------------------------------------------------
    handleClearFilters(event)
    {
        this.filters = [];
        this.isFilterListEmpty = true;
        this.isDataListEmpty = false;
        this.data = this.bufferData;
        this.logicFilterValueTemp = '';
        this.logicFilterValue = '';
    }

    // Apply all filters
    //------------------------------------------------------------------------------------------------------------------------------
    handleApplyFilters(event)
    {   console.log('%%%%%%'); 
        console.log(event);
        console.log(this.filters.length);
        if(this.filters.length>0)
        {            
            var filteredData = [];
            var filterFlag = [];
            this.data = this.bufferData;
            var filter = '';
            if(this.logicFilterValue)
            {
                filter = this.logicFilterValue;
                filter=filter.replace(/AND/gi,'&&');
                filter=filter.replace(/OR/gi,'||');
                filter=filter.replace(/NOT/gi,'!');               
            }
            else if(this.logicFilterValueTemp)
            {
                filter = this.logicFilterValueTemp;
                filter=filter.replace(/AND/gi,'&&');
                filter=filter.replace(/OR/gi,'||');
                filter=filter.replace(/NOT/gi,'!');                
            }
            
            for(var indexData=0;indexData<this.data.length;indexData++)
            {
                var dataObj = this.data[indexData];
                filterFlag = [];
                var tempFilter = filter;
                for(var indexFilters=0;indexFilters<this.filters.length;indexFilters++)
                {
                    var flag = 'false';
                    if(this.filters[indexFilters].operator == 'equals')
                    {                        
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                            && dataObj[this.filters[indexFilters].field].split("T")[0] == this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field].toLowerCase() == this.filters[indexFilters].searchValue.toLowerCase())
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'boolean'
                            && dataObj[this.filters[indexFilters].field].toString() == this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field] == this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'not equal to')
                    {
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                            && dataObj[this.filters[indexFilters].field].split("T")[0] != this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field].toLowerCase() != this.filters[indexFilters].searchValue.toLowerCase())
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'boolean'
                            && dataObj[this.filters[indexFilters].field].toString() != this.filters[indexFilters].searchValue.toString())
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field] != this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'less than')
                    {
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                            && dataObj[this.filters[indexFilters].field].split("T")[0] < this.filters[indexFilters].searchValue)
                        {                            
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field] < this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field] < this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'greater than')
                    {                        
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                            && dataObj[this.filters[indexFilters].field].split("T")[0] == this.filters[indexFilters].searchValue)
                        {
                            flag = 'false';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                                && dataObj[this.filters[indexFilters].field].split("T")[0] != this.filters[indexFilters].searchValue)
                        {
                            if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                                && new Date(dataObj[this.filters[indexFilters].field].split("T")[0]).getTime() > new Date(this.filters[indexFilters].searchValue).getTime())
                            {
                                flag = 'true';                            
                            }
                        }                        
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field] > this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field] > this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'less or equal')
                    {
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                            && dataObj[this.filters[indexFilters].field].split("T")[0] <= this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field] <= this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field] <= this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'greater or equal')
                    {
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'date'
                            && dataObj[this.filters[indexFilters].field].split("T")[0] >= this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field] >= this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field] >= this.filters[indexFilters].searchValue)
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'contains')
                    {
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field].toLowerCase().includes(this.filters[indexFilters].searchValue.toLowerCase()))
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field].includes(this.filters[indexFilters].searchValue))
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'does not contain')
                    {
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && (!dataObj[this.filters[indexFilters].field].toLowerCase().includes(this.filters[indexFilters].searchValue.toLowerCase())))
                        {
                            flag = 'true';                            
                        }
                        else if(this.fieldNameToTypeMap.has(this.filters[indexFilters].field) 
                                && this.fieldNameToTypeMap.get(this.filters[indexFilters].field) != 'text'
                                && (!dataObj[this.filters[indexFilters].field].includes(this.filters[indexFilters].searchValue)))
                        {
                            flag = 'true';                            
                        }
                    }
                    else if(this.filters[indexFilters].operator == 'starts with')
                    {                        
                        if(this.fieldNameToTypeMap.get(this.filters[indexFilters].field) == 'text'
                            && dataObj[this.filters[indexFilters].field].toLowerCase().startsWith(this.filters[indexFilters].searchValue.toLowerCase()))
                        {
                            flag = 'true';                            
                        }
                        else if(dataObj[this.filters[indexFilters].field].startsWith(this.filters[indexFilters].searchValue))
                        {
                            flag = 'true';                            
                        }
                    }
                    filterFlag.push(flag);
                }
                
                var conditionCount = 0;
                var errorFlag = false;
                for(var i=0;i<tempFilter.length;i++)
                {
                    if(!(isNaN(tempFilter.charAt(i))) && tempFilter.charAt(i) != ' ')
                    {                        
                        if(parseInt(tempFilter.charAt(i)) < 1 || parseInt(tempFilter.charAt(i)) > this.filters.length)
                        {
                            errorFlag = true;
                            const event = new ShowToastEvent({
                                title: 'Error',
                                message: 'The filter logic references an undefined filter: '+parseInt(tempFilter.charAt(i))+' .',
                                variant: 'error',
                                mode: 'dismissable'
                            });
                            this.dispatchEvent(event);
                            break;
                        }
                        else
                        {
                            conditionCount++;
                            tempFilter = tempFilter.replace(tempFilter.charAt(i),filterFlag[parseInt(tempFilter.charAt(i))-1]);
                        }                        
                    }
                }                
                if(conditionCount < this.filters.length)
                {
                    errorFlag = true;
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Some filter conditions are defined but not referenced in your filter logic.',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);
                }
                else
                {                                                            
                    
                    try 
                    {
                        if(eval(tempFilter))
                        {                              
                            filteredData.push(dataObj);
                        }
                    }
                    catch(err) 
                    {
                        errorFlag = true;
                        const event = new ShowToastEvent({
                            title: 'Error',
                            message: 'Please check the filter logic.',
                            variant: 'error',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(event);
                    }
                }                
            }

            if(!errorFlag)
            {                
                this.data = filteredData;
                if(filteredData.length==0)
                {
                    this.isDataListEmpty = true; 
                }
                else
                {
                    this.isDataListEmpty = false; 
                }               
            }
            else
            {                
                this.data = this.bufferData;
                this.isDataListEmpty = false;                
            }
        }
    }     

    // Drag and Drop functionality
    //------------------------------------------------------------------------------------------------------------------------------
    handleDragStart(event) 
    {
        event.dataTransfer.dropEffect = 'move';
        for(var index=0;index<this.filters.length;index++)
        {
            if(this.filters[index].id == event.target.dataset.item)
            {
                indexFrom = index;
                break;
            }
        }        
    }

    getIndex(index) 
    {
        return this.filters.map(function(e) { return e.id; }).indexOf(index);
    }

    handleDrop(event) 
    {
        event.preventDefault();
        for(var index=0;index<this.filters.length;index++)
        {
            var dropVal = this.filters[index].label+' '+this.filters[index].operator+' '+this.filters[index].searchValue;
            if(event.target.textContent == dropVal)
            {
                indexTo = index;
                break;
            }
        }        

        // Swapping element at indexFrom with indexTo
        [this.filters[indexFrom], this.filters[indexTo]] = [this.filters[indexTo], this.filters[indexFrom]]                
    }

    handleDragover(event) 
    {
        event.preventDefault();
        return false;
    }

    //Common Code 
    //==============================================================================================================================

    //(Method to assign opreator options according to field type)
    //------------------------------------------------------------------------------------------------------------------------------
    assignOperatorOptions(type)
    {
        if(type == 'date')
        {
            this.dateInput = true;
            this.booleanInput = false;
            this.otherInput = false;

            this.operatorOptions = operationsForDateAndNumbers;
        }
        else if(type == 'boolean')
        {
            this.dateInput = false;
            this.booleanInput = true;
            this.otherInput = false;

            this.operatorOptions = operationsForBoolean; 
        }
        else
        {
            this.dateInput = false;
            this.booleanInput = false;
            this.otherInput = true;

            if(type == 'number')
            {
                this.operatorOptions = operationsForDateAndNumbers;   
            }
            else
            {
                this.operatorOptions = operationsForText; 
            }         
        }
    }

    //Method calling to make default filter logic
    //------------------------------------------------------------------------------------------------------------------------------
    makeDefaultFilterLogic()
    {
        this.logicFilterValue = '';
        for(var indexFilters=1;indexFilters<=this.filters.length;indexFilters++)
        {                
            if(indexFilters == this.filters.length)
            {
                this.logicFilterValue += indexFilters;
            }
            else
            {
                this.logicFilterValue += indexFilters+' AND ';
            }
        }
        this.logicFilterValueTemp = this.logicFilterValue;
    }
}
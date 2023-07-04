import { LightningElement,wire,api, track } from 'lwc';
/*
import PART_I_SUMMARY from '@salesforce/label/c.MAB_Form_PART_I_SUMMARY';
import PROPOSED_NAME from '@salesforce/label/c.MAB_Proposed_Name';
import COUNTRY from '@salesforce/label/c.MAB_Country';
import CRITERIA_FOR_DESIGNATION from '@salesforce/label/c.MAB_header_label';
import ECOLOGICAL_SYSTEMS from '@salesforce/label/c.MAB_Ecological_systems';
import Tropical_humid_forests_Biome_type from '@salesforce/label/c.MAB_Tropical_humid_forests_Biome_type';
import Tropical_dry_or_deciduous_forests_biome_type from '@salesforce/label/c.MAB_Tropical_dry_or_deciduous_forests_biome_type';
import Temperate_needle_leaf_biome_type from '@salesforce/label/c.MAB_Temperate_needle_leaf_biome_type';
import Temperate_broad_leaf_biome_type from '@salesforce/label/c.MAB_Temperate_broad_leaf_biome_type';
import Warm_deserts_and_semideserts_biome_type from '@salesforce/label/c.MAB_Warm_deserts_and_semideserts_biome_type';
import Cold_winter_deserts_and_semideserts_biome_type from '@salesforce/label/c.MAB_Cold_winter_deserts_and_semideserts_biome_type';
import Tropical_grasslands_and_savannas_biome_type from '@salesforce/label/c.MAB_Tropical_grasslands_and_savannas_biome_type';
import Subtropical_and_temperate_rain_biome_type from '@salesforce/label/c.MAB_Subtropical_and_temperate_rain_biome_type';
import Biological_Diversity_Conservation_Details from '@salesforce/label/c.MAB_Biological_Diversity_Conservation_Details';
import Temperate_grasslands from '@salesforce/label/c.MAB_Temperate_grasslands_biome_type';
import Form_PART_I_SUMMARY from '@salesforce/label/c.MAB_Form_PART_I_SUMMARY';
import Next from '@salesforce/label/c.MAB_Next';
import Marine_ecosystems_biome_type from '@salesforce/label/c.MAB_Marine_ecosystems_biome_type';
import Other_Prog from '@salesforce/label/c.MAB_Other_Prog';
import Through_appropriate_zonation_B from '@salesforce/label/c.MAB_Through_appropriate_zonation_B';
import Through_appropriate_zonation from '@salesforce/label/c.MAB_Through_appropriate_zonation';
import Restoration_Prog from '@salesforce/label/c.MAB_Restoration_Prog';
import Opportunity_to_explore_approaches_to_sustainable_development from '@salesforce/label/c.MAB_Opportunity_to_explore_approaches_to_sustainable_development';
import Size_to_serve_the_three_functions_of_biosphere_reserves from '@salesforce/label/c.MAB_Size_to_serve_the_three_functions_of_biosphere_reserves';
import Adaptation_Prog from '@salesforce/label/c.MAB_Adaptation_Prog';
import Through_appropriate_zonation_A from '@salesforce/label/c.MAB_Through_appropriate_zonation_A';
import Through_appropriate_zonation_C from '@salesforce/label/c.MAB_Through_appropriate_zonation_C';
import Through_appropriate_zonation_D from '@salesforce/label/c.MAB_Through_appropriate_zonation_D';
import Organizational_arrangements from '@salesforce/label/c.MAB_Organizational_arrangements';
import Mechanisms_for_implementation from '@salesforce/label/c.MAB_Mechanisms_for_implementation';
import Development_Function from '@salesforce/label/c.MAB_Development_Function';
import Conservation_Function from '@salesforce/label/c.MAB_Conservation_Function';
import Three_functions_of_the_Biosphere_Reserves from '@salesforce/label/c.MAB_Fulfillment_of_the_three_functions_of_the_Biosphere_Reserves';
import Mitigation_Prog from '@salesforce/label/c.MAB_Mitigation_Prog';
import Climate_changeProg from '@salesforce/label/c.MAB_Climate_changeProg';
import Research_Programmes from '@salesforce/label/c.MAB_Research_Programme';
import Number_of_species from '@salesforce/label/c.MAB_Number_of_species';
import Monitoring_Prog from '@salesforce/label/c.MAB_Monitoring_Prog';
import Save_For_Later from '@salesforce/label/c.MAB_Save_For_Later';
import Attach_Files from '@salesforce/label/c.MAB_Attach_Files';
import Organizational_arrangements_1 from '@salesforce/label/c.MAB_Organizational_arrangements_1';
import Organizational_arrangements_2 from '@salesforce/label/c.Organizational_arrangements_2';
import Mechanisms_for_implementation_b from '@salesforce/label/c.MAB_Mechanisms_for_implementation_b';
import Mechanisms_for_implementation_a from '@salesforce/label/c.MAB_Mechanisms_for_implementation_a';
import Mechanisms_for_implementation_c from '@salesforce/label/c.MAB_Mechanisms_for_implementation_c';
import Logistic_Support_Function from '@salesforce/label/c.MAB_Logistic_Support_Function';
import Section_Introduction from '@salesforce/label/c.MAB_section_introduction_criterias_for_designation';
import Additional_Free_Text from '@salesforce/label/c.MAB_Additional_Free_Text';
import Biological_Diversity_Conservation from '@salesforce/label/c.MAB_Biological_Diversity_Conservation';
import Mixed_mountain_and_highland_systems_biome_type from '@salesforce/label/c.MAB_Mixed_mountain_and_highland_systems_biome_type';
import Ecological_systems_details from '@salesforce/label/c.MAB_Ecological_systems_details';
import Mixed_island_systems_biome_type from '@salesforce/label/c.MAB_Mixed_island_systems_biome_type';
import Tundra_communities_and_barren_arctic_desert_biome_type from '@salesforce/label/c.MAB_Tundra_communities_and_barren_arctic_desert_biome_type';
import Lake_systems_biome_type from '@salesforce/label/c.MAB_Lake_systems_biome_type';
import Biological_Diversity_Conservation_Picklist from '@salesforce/label/c.MAB_Biological_Diversity_Conservation_Picklist';
import Evergreen_sclerophyllous_forests_biome_type from '@salesforce/label/c.MAB_Evergreen_sclerophyllous_forests_biome_type';
import MAB_Application__c from '@salesforce/schema/MAB_Application__c';
import MAB_Country from '@salesforce/schema/MAB_Application__c.MAB_Countries__c';
import getFormApplicationById from '@salesforce/apex/MABApplicationFormController.getFormApplicationById';
*/
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import objAccount from '@salesforce/schema/Account';
import AccountSource from '@salesforce/schema/Account.AccountSource';

//import { handleGoNext, handleSaveForLater,applicationFormPart1Constructor } from 'c/mabApplicationFormManagement';
//import { FlowAttributeChangeEvent, FlowNavigationNextEvent, FlowNavigationFinishEvent} from 'lightning/flowSupport';

export default class MultiRowForm extends LightningElement {

    @api firstName;
    @api lastName;
    @api email;
    @api appFormId;
    @api action;
    @api applicantEmail;


    @api formType;
    @api nominatioFormId;
   
    sectionInfos = [];
    isNext;

   /* label = {
        PART_I_SUMMARY,
        PROPOSED_NAME,
        CRITERIA_FOR_DESIGNATION,
        COUNTRY,Section_Introduction,
        ECOLOGICAL_SYSTEMS,Temperate_grasslands,
        Tropical_humid_forests_Biome_type,
        Subtropical_and_temperate_rain_biome_type,
        Temperate_needle_leaf_biome_type,Conservation_Function,
        Tropical_dry_or_deciduous_forests_biome_type,
        Temperate_broad_leaf_biome_type,Restoration_Prog,
        Evergreen_sclerophyllous_forests_biome_type,
        Warm_deserts_and_semideserts_biome_type,
        Cold_winter_deserts_and_semideserts_biome_type,
        Tundra_communities_and_barren_arctic_desert_biome_type,
        Tropical_grasslands_and_savannas_biome_type,
        Mixed_mountain_and_highland_systems_biome_type,
        Mixed_island_systems_biome_type,Mitigation_Prog,
        Lake_systems_biome_type,Climate_changeProg,
        Ecological_systems_details,Research_Programmes,
        Biological_Diversity_Conservation,Adaptation_Prog,
        Biological_Diversity_Conservation_Details,Other_Prog,
        Attach_Files,Number_of_species,Monitoring_Prog,
        Additional_Free_Text,Marine_ecosystems_biome_type,
        Biological_Diversity_Conservation_Picklist,
        Three_functions_of_the_Biosphere_Reserves,
        Development_Function,Logistic_Support_Function,
        Opportunity_to_explore_approaches_to_sustainable_development,
        Size_to_serve_the_three_functions_of_biosphere_reserves,
        Through_appropriate_zonation,Mechanisms_for_implementation_a,
        Through_appropriate_zonation_A,Organizational_arrangements_1,
        Through_appropriate_zonation_B,Mechanisms_for_implementation,
        Through_appropriate_zonation_C,Organizational_arrangements_2,
        Through_appropriate_zonation_D,Organizational_arrangements,
        Mechanisms_for_implementation_b,Mechanisms_for_implementation_c,
        Next,Save_For_Later,Form_PART_I_SUMMARY

    };*/

    allowedFormats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color',
        'background',
        'code',
        'code-block',
        'script',
        'blockquote',
        'direction',
    ];

    resumedApplicationForm = {}
    mabAppForm;
    @api isFormResumed;
    //@track applicationFormPart1 = applicationFormPart1Constructor();
    //applicationFormConstructor();

    @api 
    get applicationForm(){
        return JSON.stringify(this.applicationFormPart1);
    }

    @api resumedAppFormId;
 /*
    @wire(getObjectInfo, { objectApiName: objAccount })
    mabApplicationMetadata;

    @wire(getPicklistValues, {
        recordTypeId: '$mabApplicationMetadata.data.defaultRecordTypeId', 
        fieldApiName: AccountSource
    })
    countryPickslitVal;

    @wire(getFormApplicationById,{appFormId : '$resumedAppFormId'})
    wiredApplicationForm(result) {
        
        if(result.data && this.isFormResumed){
              console.log('$$$$$$$$ avant ****$'+JSON.stringify(result.data));
              this.resumedApplicationForm =  JSON.parse(JSON.stringify(result.data));
              //applicationFormConstructor(result.data);
              console.log('data resumed apres ****$'+JSON.stringify(this.resumedApplicationForm.sectionsDetails));
              this.isFormResumed = true;
        }
        
    }
*/
    connectedCallback(){
        console.log('nominatioFormId *******'+this.nominatioFormId);
        /*if(!this.isFormResumed){
            this.applicationFormPart1.email = this.email;
            this.applicantEmail = this.email;
            this.applicationFormPart1.lastName = this.lastName;
            this.applicationFormPart1.firstName = this.firstName;
        }*/
    }
   /*
    handleProposedNameChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.proposedName = event.detail.value;
        }else{
            this.applicationFormPart1.proposedName = event.detail.value;
        }
       
    }

    handleCountryPicklistChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.country = event.detail.value;
        }
        else{
            this.applicationFormPart1.country = event.detail.value;
        }

       
    }

    handleEcologicalSystemsDetailsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.ecologicalSystemsDetails = event.target.value;
        }else{
            this.applicationFormPart1.ecologicalSystemsDetails = event.target.value;
        }
       
    }

    handleSubtropicalTemperateRainForestsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.subtropicalTemperateRainForests = event.target.value;
        }else{
            this.applicationFormPart1.subtropicalTemperateRainForests = event.target.value;
        }
    }

    handleMarineEcosystemsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isMarineEcosystems = event.target.value;
        }else{
            this.applicationFormPart1.isMarineEcosystems = event.target.value;
        }
       
    }

    handleTropicalHumidForestsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTropicalHumidForests = event.target.checked;
        }else{
            this.applicationFormPart1.isTropicalHumidForests = event.target.checked;
        }
       
    }

    handleRainForestsOrWoodlandsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isRainForestsOrWoodlands = event.target.checked;
        }else{
            this.applicationFormPart1.isRainForestsOrWoodlands = event.target.checked;
        }
       
    }

    handleTemperateNeedleleafForestsOrWoodlChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isNeedleleafForestsOrWoodl= event.target.checked;
        }else{
            this.applicationFormPart1.isNeedleleafForestsOrWoodl= event.target.checked;
        }
        
    }

    handleTropicalDryOrDeciduousForestChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTropicalDryOrDeciduousForests= event.target.checked;
        }else{
            this.applicationFormPart1.isTropicalDryOrDeciduousForests= event.target.checked;
        }
       
    }

    handleTemperateBroadLeafForestsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTemperateBroadLeafForests= event.target.checked;
        }else{
            this.applicationFormPart1.isTemperateBroadLeafForests= event.target.checked;
        }
    
    }


    handleTemperateBroadLeafForestsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTemperateBroadLeafForests= event.target.checked;
        }else{
            this.applicationFormPart1.isTemperateBroadLeafForests= event.target.checked;
        }
       
    }

    handleEvergreenSclerophyllousForestsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isEvergreenSclerophyllousForests= event.target.checked;
        }else{
            this.applicationFormPart1.isEvergreenSclerophyllousForests= event.target.checked;
        }
        
    }


    handleWarmDesertsAndSemideserts(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isWarmDesertsAndSemideserts= event.target.checked;
        }else{
            this.applicationFormPart1.isWarmDesertsAndSemideserts= event.target.checked;
        }
   
    }

    handleColdWinterDesertsAndSemideserts(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isColdWinterDesertsAndSemidesertss= event.target.checked;
        }else{
            this.applicationFormPart1.isColdWinterDesertsAndSemidesertss= event.target.checked;
        }
       
    }

    handleTundraCommunitiesAndBarrenDesert(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTundraCommunitiesAndBarrenDesert= event.target.checked;
        }else{
            this.applicationFormPart1.isTundraCommunitiesAndBarrenDesert= event.target.checked;
        }
       
    }

    handleTropicalGrasslandsAndSavannas(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTropicalGrasslandsAndSavannas= event.target.checked;
        }else{
            this.applicationFormPart1.isTropicalGrasslandsAndSavannas= event.target.checked;
        }
        
    }

   handleTemperateGrasslands(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isTemperateGrasslands= event.target.checked;
        }else{
            this.applicationFormPart1.isTemperateGrasslands= event.target.checked;
        }
      
    }

    handleMixedMountainAndHighlandSystems(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isMixedMountainAndHighlandSystems= event.target.checked;
        }else{
            this.applicationFormPart1.isMixedMountainAndHighlandSystems= event.target.checked;
        }
        
    }

    handleMixedIslandSystems(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isMixedIslandSystems= event.target.checked;
        }else{
            this.applicationFormPart1.isMixedIslandSystems= event.target.checked;
        }
      
    }

    handleLakeSystems(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isLakeSystems= event.target.checked;
        }else{
            this.applicationFormPart1.isLakeSystems= event.target.checked;
        }
       
    }

    handleClimateChangeProgChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isClimateChangeProg= event.target.checked;
        }else{
            this.applicationFormPart1.isClimateChangeProg= event.target.checked;
        }
       
    }

    handleMitigationProgChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isMitigationProg= event.target.checked;
        }else{
            this.applicationFormPart1.isMitigationProg= event.target.checked;
        }
        
    }

    handleAdaptationProgChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isAdaptationProg= event.target.checked;
        }else{
            this.applicationFormPart1.isAdaptationProg= event.target.checked;
        }
        
    }

    handleRestorationProgChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isRestorationProg= event.target.checked;
        }else{
            this.applicationFormPart1.isRestorationProg= event.target.checked;
        }
      
    }

    handleMonitoringProgChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isMonitoringProg= event.target.checked;
        }else{
            this.applicationFormPart1.isMonitoringProg= event.target.checked;
        }
        
    }

    handleOtherProgChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.isOtherProg= event.target.checked;
        }else{
            this.applicationFormPart1.isOtherProg= event.target.checked;
        }
       
    }

    handleProgResearchDetailsChange(event){
        if(this.isFormResumed){
            this.resumedApplicationForm.progResearchDetails= event.detail.value;
        }else{
            this.applicationFormPart1.progResearchDetails= event.detail.value;
        }
       
    }

    hanldeSectionInfosChange(event){

        this.sectionInfos = event.detail;
        console.log('sectionInfos ********'+JSON.stringify(this.sectionInfos));
    }*/
    /*handleApplicationFormIdCreated(event){
        this.appFormId = event.detail.appFormId;
    }*/

    handleSaveForm(){

       var isResumedApp;
       if(this.isFormResumed){
          this.mabAppForm = this.resumedApplicationForm;
          isResumedApp = this.resumedAppFormId;
       }else{
          this.mabAppForm = this.applicationFormPart1;
           isResumedApp = null;
       }
       this.mabAppForm.sectionsDetails = this.sectionInfos;
       console.log('Part 2 SectionInfos'+JSON.stringify(this.sectionInfos));
       console.log('Part 2 this.mabAppForm'+JSON.stringify(this.mabAppForm));
       handleSaveForLater(isResumedApp,this.mabAppForm,this.formType,this.nominatioFormId)
       .then(res => {
             
             this.action = 'SaveForLater';
             this.appFormId = res;
             this.dispatchEvent(new FlowNavigationNextEvent());
             console.log('resultat from save for later part 2'+JSON.stringify(res));
       });
    }

    handleGoNextPage(){
        this.action = 'Next';
        console.log('Next entry *****'+this.isFormResumed);
        this.isNext = true;
        if(this.isFormResumed){
            this.mabAppForm = this.resumedApplicationForm;
         }else{
     
            this.mabAppForm = this.applicationFormPart1;
         }
         console.log('Next entry ***** mab app form'+JSON.stringify(this.mabAppForm));
         this.mabAppForm.sectionsDetails = JSON.parse(JSON.stringify(this.sectionInfos)); 
         console.log('Next entry ***** section details assignment');
       /* handleGoNext(this.sectionInfos,null,mabAppForm,this.formType,this.nominatioFormId)
         .then(res => {
                  this.appFormId = res;
                  this.isNext = true;
                  console.log('resultat from go next'+JSON.stringify(res));
                 
            });*/
        
   
    }

    
}
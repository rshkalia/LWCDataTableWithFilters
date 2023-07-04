public class MultipleRowsController {



    public static List<Account> saveFiles(Id AccId,String sectionInfos){

        system.debug('save files ******** sectionInfos'+sectionInfos);

        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();
        Map<String,Id> fileIdByFileName = new  Map<String,Id>();
        if(sectionInfos != null){
        
            List<SectionDetails> sectionValues = (List<SectionDetails>)JSON.deserialize(sectionInfos, List<SectionDetails>.class);

            //List<MAB_Section_Details__c> sectionsDetailsToInsert = new List<MAB_Section_Details__c>();
   

          fileIdByFileName = createContentVersion(sectionValues);

            /*
            for (SectionDetails sectionInfo : sectionValues) {

                MAB_Section_Details__c sectionDetails = new MAB_Section_Details__c();

                sectionDetails.MAB_field1Value__c = sectionInfo?.field1value;
                sectionDetails.MAB_field2Value__c = sectionInfo?.field2Value;
                sectionDetails.MAB_additionalFreeText_section__c = sectionInfo?.additionalFreeText;
                sectionDetails.MAB_SectionName__c = sectionInfo?.sectionName;
                sectionDetails.MAB_Application__c = applicationFormId;
                sectionDetails.MAB_filesId__c = '';
                if(sectionInfo.filesUploaded != null){
                    for(FileInfo file : sectionInfo.filesUploaded){
                        sectionDetails.MAB_filesId__c += fileIdByFileName.get(sectionInfo.id+'_'+file.title);
                    }
                }
                
                sectionsDetailsToInsert.add(sectionDetails);
            }
            insert sectionsDetailsToInsert;
            */
        
            //return sectionsDetailsToInsert;
        }
        return null;
       
    }

    public static Map<String,Id> createContentVersion(List<SectionDetails> sectionValues) {

        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();
        Map<String,Id> fileIdByFileName = new Map<String,Id>();
        List<FileInfo> filesList = new List<FileInfo>();

        for (SectionDetails sectionInfo : sectionValues) {
                
             
            if(sectionInfo.filesUploaded != null){
              for(FileInfo file : sectionInfo.filesUploaded){
                  ContentVersion objCntVersion = new ContentVersion();
                  objCntVersion.PathOnClient = sectionInfo.id+'_'+file.title;
                  objCntVersion.Title = sectionInfo.id+'_'+file.title;
                  objCntVersion.VersionData = file.versionData;
                  lstVersionsToInsert.add(objCntVersion); 
              }
              filesList.addAll(sectionInfo.filesUploaded);
          }

        }
        insert lstVersionsToInsert;

      
        if(lstVersionsToInsert.size() > 0){
            List<ContentVersion> contentVersionLst = [select ContentDocumentId,title from ContentVersion  where id in :lstVersionsToInsert];
            for(ContentVersion insertedFile : contentVersionLst) {
                fileIdByFileName.put(insertedFile.Title,insertedFile.ContentDocumentId);
            }
        }

        return fileIdByFileName;    

    }


    public class FileInfo {  
        @AuraEnabled
        public String title;
        @AuraEnabled
        public Blob versionData;
    }

    public class SectionDetails {
        @AuraEnabled
        public String id;
        @AuraEnabled
        public String sectionName;
        @AuraEnabled
        public String field1value;
        @AuraEnabled
        public String field2value;
        @AuraEnabled
        public String additionalFreeText;
        @AuraEnabled
        public List<FileInfo> filesUploaded;
    }
}
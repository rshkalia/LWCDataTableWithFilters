public class AccountsController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts()
    {        
        return [SELECT Id, Name, Website, Phone,billingCountry, industry,NumberOfEmployees, CreatedDate FROM Account]; 
    }

}
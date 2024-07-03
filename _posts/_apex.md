## How To Secure Apex Code With User Mode Database Operations
https://youtu.be/1agImQ1MWJs

Apex SQL is written directly with `[SQL]` and note the definition of user system context in query.
This is called Statis SOQL.

```apex
public class CaseController {
	public void testCaseView(){
		List<Case> allCases = [SELECT Id, Subject FROM CASE WITH USER_MODE];
		System.Debug('# of cases: ' + allCases.size())
	}
}
```

Database inserts specify user or system mode 

```apex
public class CaseController {
	public void testCaseCreation(){
		Case singleCase = new Case(
			Status='New',
			Origin='Email',
			Subject='Mobile is not working');
		Database.Insert(singleCase, AccessLevel.USER_MODE);
		# Database.Insert(singleCase, AccessLevel.SYSTEM_MODE);
	}
}
```

## Security in Dyanmic SOQL and DML
https://youtu.be/NSjOLmP8Eks

Note with sharing

```apex
public with sharing class AccountController {
	public List<Account> getAllAcounts(){
		String searchQuery='SELECT Id,Name,Phone FROM Account';
		List<Account> accountList=Database.query(searchQuery, AccessLevel.USER_MODE);
	}
}
```

DML

```apex
public void getSearchedRecords() {
	try{
		String searchQuery='Find\'Edge*\'IN ALL FIELDS ';
		searchQuery+='RETURNING Account(id,name),Contact, Lead';
		List<list<SObject>> searchList=Search.query(searchQuery, AccessLevel.USER_MODE);
	}
	catch(DmlException exception){
		system.debug('Access Violation');
	}
}
```

Without specification Apex will run in system context

You can insert in user or system mode (DML)

```apex
public class SecurityDemo {
	public static void getAllRecords(){
		String searchQuery='SELECT Id,Name,TotalSalary__c FROM Department__c';
		List<Department__c> lstDepartment=Database.query(searchQuery);
	}

	public static void insertRecord(String departmentName, Double totalSalary){
		Department__c dep = new Department__c(Name=departmentName,TotalSalary__c=totalSalary);
		# apex DML statement
		insert as user dep; // insert as system dep;
	}
}
```

## Skill dev academy
https://youtu.be/DSpY_VD1_iQ

Dynamic SOQL is vulnerable. Use `EscapeSingleQuote`.
When using Databse, use `Database.qeuryWithBinds`.

Statis SOQL as `EscapeSingleQuote` built it.

Vulnerable Dynamic SOQL
Exploit `'' AnnualRevenue>0 or Rating=''`.

```apex
public class VFPageController {
	public static void getRecords(String userParam){
		String searchQuery='SELECT Id,Name FROM Account';
		String whereClause=' Where Name=\''+userParam+'\'';
		List<Account> accountList=Database.query(searchQuery+whereClause);
	}
}
```

Fix by `userParam=String.escapeSingleQuotes(userParam);`.

Another way `Database.queryWithBinds(query,map,AccessLevel.USER_MODE)` where `map` is key-value. Then in the string, use `whereClause=' Where Name=:AccountName'`.

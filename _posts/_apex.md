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

TODO check for static SOQL without user_mode

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

TODO check for database query with system mode

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

TODO with sharing

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

TODO search for no specification and for insert as system

## Dynamic SOQL vuln
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

TODO check for dynamic content without these functions

Fix by `userParam=String.escapeSingleQuotes(userParam);`.

Another way `Database.queryWithBinds(query,map,AccessLevel.USER_MODE)` where `map` is key-value. Then in the string, use `whereClause=' Where Name=:AccountName'`.

## Seucirty using Schema Class
https://youtu.be/yGah99ORLQA

Both `WITH_SECURITY_ENFORCED` and `USER_MODE` will throw exception in security violations.

Schema class help check access: `isAccssible, isCreatable, isUpdateable, isDeleteable`.

```apex
if (Schema.SObjectType.Contact.fields.Email.isUpdateable()) {
	// update field
}
```

TODO: This looks like an invitation for mistakes using system mode.

This is checking about the logged-in user.

## StripInaccessible
https://youtu.be/f_lduM7bb9g

Remove frields from a query list wich the user doesn't have access to.

This is a replacement to static SOQL with USER_MODE.

```apex
// Any field the user has access to will be returned
SObjectAccessDecision securityDecision = Security.stripInaccessible(AccessType.READABLE,[SELECT Id,Name,TotalSalary__c From Department__c]);
List<Department_cc> departmentList = securityDecision.getrecords();
```

TODO: Is this still running in system context? So lines can be exposed but not their fields?

## WITH USER_MODE
https://youtu.be/NSjOLmP8Eks

Even if someone uses `WITH SECURITY_ENFORCED`.
`with sharing`
`without sharing`

`WITH USER_MODE` overrides and enforces `with sharing class`.

TODO If you put `without sharing class` you actuall get sharing?

TODO what security enforced does?

## WITH SECURITY_ENFORCED
https://youtu.be/ZPjZlHMH0kQ

This fails the experience on field-level security.
Without this flag they just doesn't get the data.

Class level share stuff is about object-level access.

```apex
public with sharing class DepartmentHelper {
	public statis List<Department__c> getAllRecords() {
		return [SELECT Id,Name,Owner,TotalSalary__c From Department__c]
	}
}
```

This example has object level but not field level security applied to user.
So user will be able to see field they don't have access to in records they do have access to.

Field-level as well as object-level security is enforced with WITH SECURITY_ENFORCED.

If you apply `SELECT Id,Name,Owner From Department__c Where TotalSalary__c>10 WITH SECURITY_ENFORCED` this won't work! bcs it only works on the things in select.

TODO find SECURITY_ENFORCED when where has something not in SELECT. Works for Where and OrderBy.

## Object and field level security
https://youtu.be/KtI6Ugw53s4

With-sharing enforces record-level security but NOT object/field-level security.

Object level means stuff like CRUD on object.

Record level is about ownership of record.

## Security Salesforce
https://youtu.be/sFFGDQDK_4E

These usually run in sys mode: Apex Classes, Apex Triggers, Apex Web Services

## Apex Dev Guide on using with sharing, without sharing and inherited sharing

`with sharing class` enforces context to current user.

`without sharing class` sharing rules are not enforced.

`inherited sharing` is based on the calling class.

TODO If nothing is declared, class used as an entry point to an apex transaction runs `without sharing`. But that is not the case for 1inherited sharing`.
TODO check for inner class that is without sharing.

## Apex Dev Guide anonymous blocks

Apex blocks you can execute through dev console, salesforce extension for VSCode or from SOAP API like `ExecuteAnonymousResult executeAnonymous(String code)`.

TODO is this eval??







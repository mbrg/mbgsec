## How To Secure Apex Code With User Mode Database Operations
https://youtu.be/1agImQ1MWJs

Apex SQL is written directly with `[SQL]` and note the definition of user system context in query

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

---
title: "ACID Database Model"
header:
  teaser: /assets/images/the-beginners-guide-transaction-in-spring/spring-transaction-management.png
  og_image: /assets/images/the-beginners-guide-transaction-in-spring/spring-transaction-management.png
categories:
- Spring
tags:
- spring
- beginners-guide
- transaction
- transaction-management
toc: true
toc_sticky: true
---
Today we are going to discuss what is a Transaction Management within Spring.

{% include figure image_path="/assets/images/the-beginners-guide-transaction-in-spring/spring-transaction-management.png"
alt="this is top image" %}

## What is JPA?
- This stands for Java **Persistence Architecture**
- The JPA is a Java specification for accessing, persisting and managing data between Java objects, classes and relational databases.
- The JPA provides guidelines to develop an interface with certain standard levels.
- But JPA doesn’t provide any implementation for that interface.
- You can use the implementations of JPA like **Hibernate**. But remember, **JPA is a specification and Hibernate is one of the implementations of JPA**.

## Transaction management with Spring
- In Spring Boot it automatically enabled transaction management.
- But if you are using Spring MVC, you need to add the **@EnableTransactionManagement** annotation in the main class
- **@Transactional** annotation tells Spring that a transaction is required to execute a method or class.
- If this annotation is used in a method, it should be a public one.
- Actually, Spring **@Transactional** annotation converts the method into a simple JDBC transaction model

```java
@Transactional
public List<Employee> getEmployees() {
  Connection connection = dataSource.getConnection();
  try (connection) {
    connection.setAutoCommit(false);
    return employeeRepository.findAll();
    connection.commit();
  } catch (SQLException e) {
    connection.rollback();
  }
}
```

## How the transaction works in Spring
Look at the following control and service

```java
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    public EmployeeController(EmployeeService employeeService){
        this.employeeService=employeeService;
    }

    private EmployeeService employeeService;

    @GetMapping("/getEmployees")
    public List<Employee> getAllEmployees(){
        return employeeService.getEmployees();
    }
}
```

<br>

```java
@Service
@Transactional
public class EmployeeService {

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository=employeeRepository;
    }

    private EmployeeRepository employeeRepository;

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }
}
```

When EmployeeController injects the EmployeeService, Spring generates a **dynamic CGLib proxy object** that wraps the service object and provides the required codes to manage the transaction.

- The proxy delegates handling transactions to the transaction manager.
- Once the transaction is completed, it will commit or roll back the transaction.

## Physical transaction vs logical transaction
Look at the following example

```java
@Service
public class EmployeeService {

    @Autowired
    private AccountService accountService;

    @Transactional
    public void getAccountDetails() {
       accountService.createAccountDocument();
    }
}

@Service
public class AccountService {

    @Transactional
    public void createAccountDocument() {
    }
}
```

- Here EmployeeService getAccountDetails() method calls another @Transactional method in AccountService
- According to the **ACID** properties, it should be one transaction.
- Spring calls this a **physical transaction**. It is just actual JDBC connections.
- But internally there are two **logical transactions**. The first one in EmployeeService and another one in AccountService
- If we change the propagation type in createAccountDocument( ) we can change it to have two physical connections.

## @Transactional annotation
- This can be used with classes and methods.
- It defines a **single database transaction** without closing the connection.
- This supports Propagation type, Isolation level, the timeout for operation, readOnly flag and rollback rules.
- There is no use in using this for **GET** operations. Because we are just getting data from the DB. You can use it but it will lead to overhead because of the **transaction interceptor and AOP proxy**.

## Propagation levels in Spring Transaction
- You can set propagation levels like
> @Transactional(propagation=Propagation.REQUIRED)

- There are few propagation levels in Spring.
- It explains **the way of creating a transaction** 

## Types of propagation levels

**REQUIRED**
- This is the default propagation level.
- It says I need a transaction either open one or use the existing one.
- It means it always executes in a transaction.

**SUPPORTS**
- If a current transaction exists then it uses. If not it gets executed without a transaction.
- It means it may use or not a transaction.

**MANDATORY**
- This requires an existing physical transaction, if not it will cause an exception.

**REQUIRES_NEW**
- Requesting a completely own physical transaction.
- If already there is a transaction, it will be suspended and create a new transaction.

**NOT_SUPPORTED**
- Always execute without a transaction.
- If there is a transaction it gets suspended.

**NEVER**
- Always execute without a transaction.
- This means, no physical transaction will exist. If found, it will cause an exception.

**NESTED**
- This is the same as REQUIRED but it uses save-points.
- Simply it means inner logical transactions may roll back independently.

## Read operations in a transaction

**Dirty read**
- This occurs when a transaction reads data that is written but not committed by another transaction.
- T2 updates a row but is not committed and T1 reads the row. But if T2 rollback, the value which is read by T1 is not valid.

**Nonrepeatable read**
- This occurs when a transaction reads the same data twice but gets different values.
- T1 reads a row then T2 updates the row and commits. Then T1 reads the row and gets a different value.

**Phantom read**
- This occurs when a transaction executes a query and gets a value set. Then get additional values as well in different execution.
- T1 reads some data. T2 adds some additional data in another transaction. Then T1 reads data and gets additional data set.

## What is an Isolation in Spring Transaction?
- This defines how the data behaviors in transactions.
- You can set it like below
> @Transactional(isolation = Isolation.SERIALIZABLE)

## Isolation levels in Spring Transaction

Isolation.**DEFAULT**
- Use the default isolation level in the underlying database

Isolation.**READ_COMMITTED**
- This prohibits reading uncommitted data
- If you use this, dirty reads will be prevented

Isolation.**READ_UNCOMMITTED**
- This allows to read one transaction update a row but not committed and other transactions can read data even if not committed.
- All read operations, dirty, non-repeatable and phantom can occur.

Isolation.**REPEATABLE_READ**
- This prohibits reading uncommitted data and also prohibits one transaction reads a row and another transaction alters the data.
- This prevents both dirty reads and nonrepeatable reads

Isolation.**SERIALIZABLE**
- all dirty reads, nonrepeatable reads and phantom reads are prevented

## What is rollbackFor and noRollbackFor in Spring Transaction?
- By default, @Transactioanl will take a look at RunTimeExceptions. If you need, you can roll back for any exceptions using rollbackFor.
> @Transactional(readOnly = false, rollbackFor = Exception.class)

- rollbackFor can be used to indicate which exceptions cause the transaction rollback
- noRollbackFor can be used to indicate which exception does not cause the transaction rollback

## What is readOnly in Spring Transaction?
- The default value is false
- We can use readOnly=true for search operations

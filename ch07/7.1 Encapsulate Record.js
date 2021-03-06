//변경 전
organization = {name:"에크미 구스베리", country: "GB"};

//변경 후
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name()  {return this._name;}
    set name(arg)  {this._name = arg;}
    get country()   {return this._country;}
    set country(arg)    {this._country = arg;}    
}
/*
절차
1.레코드 변수 캡슐화
2.레코드를 감싼 클래스로 변경. 원본 반환하는 접근자 정의, 딴 함수들이 이 접근자를 사용하도록 수정
3.테스트
4.원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수 만들기
5.레코드 반황 함수를 4번에서 정의한 함수가 반환하도록 수정. 세터 추가
6.원본데이터를 반환하는 접근자 원본 레코드를 반환하는 함수들을 제거
7.테스트
8.이후 배울 레코드 캠슐화하기와 컬렉션 캠슐화하기를 재귀적으로 적용
*/

/*
예제 1번
const organization = {name:"애크미 구스베리", country:"GB"}
-----
result += `<h1>${organization.name}</h1>`;//읽기 예
organization.name = newName;//쓰기 예

->
절차1.레코드 변수 캡슐화

function getRawDataOfOrganization(){return organization;}
-----
result += `<h1>${getRawDataOfOrganization().name}</h1>`;//읽기 예
getRawDataOfOrganization().name = newName;//쓰기 예

2.레코드를 감싼 클래스로 변경. 원본 반환하는 접근자 정의, 딴 함수들이 이 접근자를 사용하도록 수정
class Organization {
    constructor(data){
        this._data = data;
    }
}

const organization new Organization({name:"애크미 구스베리", country:"GB"});
function getRawDataOfOrganization(){return organization._data;}
-----
result += `<h1>${getRawDataOfOrganization().name}</h1>`;//읽기 예
getRawDataOfOrganization().name = newName;//쓰기 예

3.테스트

4.새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
class Organization {
    constructor(data){
        this._data = data;
    }
    set name(aString)   {this._data.name = aString;}
    get name()          {return this._data.name;}
}

const organization new Organization({name:"애크미 구스베리", country:"GB"});
function getRawDataOfOrganization(){return organization._data;}
function getOrganization(){return organization;}
-----
result += `<h1>${getRawDataOfOrganization().name}</h1>`;//읽기 예
getRawDataOfOrganization().name = newName;//쓰기 예


5.레코드 반환 함수를 4번에서 정의한 함수가 반환하도록 수정. 세터 추가
class Organization {
    constructor(data){
        this._data = data;
    }
    set name(aString)   {this._data.name = aString;}
    get name()          {return this._data.name;}

    set country(aString)    {this._data.country = aString;}
    get country()           {return this._data.country;}
}

const organization new Organization({name:"애크미 구스베리", country:"GB"});
function getRawDataOfOrganization(){return organization._data;}
function getOrganization(){return organization;}
-----
result += `<h1>${getOrganization().name}</h1>`;//읽기 예
getOrganization().name = newName;//쓰기 예

6.원본데이터를 반환하는 접근자 원본 레코드를 반환하는 함수들을 제거
class Organization {
    constructor(data){
        this._data = data;
    }
    set name(aString)   {this._data.name = aString;}
    get name()          {return this._data.name;}

    set country(aString)    {this._data.country = aString;}
    get country()           {return this._data.country;}
}

const organization new Organization({name:"애크미 구스베리", country:"GB"});
function getOrganization(){return organization;}
-----
result += `<h1>${getOrganization().name}</h1>`;//읽기 예
getOrganization().name = newName;//쓰기 예


-> 추가적으로 _data 변경 작업 진행
class Organization {
    constructor(data){
        this._name = data.name;
        this._country = data.country;
    }
    set name(aString)   {this._name = aString;}
    get name()          {return this._name;}

    set country(aString)    {this._country = aString;}
    get country()           {return this._country;}
}

const organization new Organization({name:"애크미 구스베리", country:"GB"});
function getOrganization(){return organization;}
-----
result += `<h1>${getOrganization().name}</h1>`;//읽기 예
getOrganization().name = newName;//쓰기 예


7.테스트


8. 이후 배울 레코드 캠슐화하기와 컬렉션 캠슐화하기를 재귀적으로 적용
*/















/*
예제 2번
"1920":{
    name:"마틴 파울러", id:"1920",
    usages:{
        "2016":{
            "1":50,
            "2":55,
            //나머지 달 생략
        },
        "2015":{
            "1":70,
            "2":63,
            //나머지 달 생략
        },
    }
},
"38673":{
    name:"닐 포드", id:"38673",
    usages:{},
}
-----
//읽기 예
customerData[customerID].usages[year][month] = amout;

//쓰기 예
function compareUsage (customerID, laterYear, month){
    const later     =   customerData[customerID].usages[laterYear][month];
    const earlier   =   customerData[customerID].usages[laterYear -1][month];
    return{laterAmount: later, change: letaer - earlier};
}

1.레코드 변수 캡슐화
2.레코드를 감싼 클래스로 변경. 원본 반환하는 접근자 정의, 딴 함수들이 이 접근자를 사용하도록 수정
3.테스트
4.원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수 만들기
5.레코드 반황 함수를 4번에서 정의한 함수가 반환하도록 수정. 세터 추가
6.원본데이터를 반환하는 접근자 원본 레코드를 반환하는 함수들을 제거
7.테스트
8.이후 배울 레코드 캠슐화하기와 컬렉션 캠슐화하기를 재귀적으로 적용


1.레코드 변수 캡슐화
function getRawDataOfCustomers()    {return coustomerData;}
-----
//읽기 예
getRawDataOfCustomers()[customerID].usages[year][month] = amout;

//쓰기 예
function compareUsage (customerID, laterYear, month){
    const later     =   getRawDataOfCustomers()[customerID].usages[laterYear][month];
    const earlier   =   getRawDataOfCustomers()[customerID].usages[laterYear -1][month];
    return{laterAmount: later, change: letaer - earlier};
}

2.레코드를 감싼 클래스로 변경. 원본 반환하는 접근자 정의, 딴 함수들이 이 접근자를 사용하도록 수정
class CustomerData{
    constructor(data){
        this._data = data;
    }
}
const customerData = new CustomerData( data.. )
function getRawDataOfCustomers()    {return customerData._data;}
function setRawDataOfCustomers(arg) {customerData = new CustomerData(arg);}
-----
//쓰기 예
getRawDataOfCustomers()[customerID].usages[year][month] = amout;

//읽기 예
function compareUsage (customerID, laterYear, month){
    const later     =   getRawDataOfCustomers()[customerID].usages[laterYear][month];
    const earlier   =   getRawDataOfCustomers()[customerID].usages[laterYear -1][month];
    return{laterAmount: later, change: letaer - earlier};
}

3.테스트

4.원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수 만들기
class CustomerData{
    constructor(data){
        this._data = data;
    }
    setUsage(customerID, year, month, amount)   {this._data[customerID].usages[year][month] = amount;}
    usage(customerID, year, month)              {return this._data[customerID].usages[year][month];}

    get rawData(){
        return _.cloneDeep(this._data);
    }
}

const customerData = new CustomerData( data.. )
function getRawDataOfCustomers()    {return customerData._data;}
function setRawDataOfCustomers(arg) {customerData = new CustomerData(arg);}
function getCustomerData()  {return customerData;}
    
-----
//쓰기 예
getRawDataOfCustomers()[customerID].usage[year][month] = amout;

//읽기 예
function compareUsage (customerID, laterYear, month){
    const later     =   getRawDataOfCustomers()[customerID].usages[laterYear][month];
    const earlier   =   getRawDataOfCustomers()[customerID].usages[laterYear -1][month];
    return{laterAmount: later, change: letaer - earlier};
}

5.코드 사용 하는 곳에서 레코드 반환 함수를 4번에서 정의한 함수가 반환하도록 수정. 세터 추가
class CustomerData{
    constructor(data){
        this._data = data;
    }
    setUsage(customerID, year, month, amount)   {this._data[customerID].usages[year][month] = amount;}
    usage(customerID, year, month)              {return this._data[customerID].usages[year][month];}

    get rawData(){
        return _.cloneDeep(this._data);
    }
}

const customerData = new CustomerData( data.. )
function getRawDataOfCustomers()    {return customerData._data;}
function setRawDataOfCustomers(arg) {customerData = new CustomerData(arg);}
function getCustomerData()  {return customerData;}
-----
//쓰기 예
getCustomerData().setUsage(customerID,year,month,amout);
//읽기 예
function compareUsage (customerID, laterYear, month){
    const later     =   getCustomerData().usages(customerID,laterYear,month);
    const earlier   =   getCustomerData().usages(customerID,laterYear-1,month);
    return{laterAmount: later, change: letaer - earlier};
}

6.원본데이터를 반환하는 접근자 원본 레코드를 반환하는 함수들을 제거
class CustomerData{
    constructor(data){
        this._data = data;
    }
    setUsage(customerID, year, month, amount)   {this._data[customerID].usages[year][month] = amount;}
    usage(customerID, year, month)              {return this._data[customerID].usages[year][month];}

    get rawData(){
        return _.cloneDeep(this._data);
    }
}

const customerData = new CustomerData( data.. )
function getCustomerData()  {return customerData;}
-----
//쓰기 예
getCustomerData().setUsage(customerID,year,month,amout);
//읽기 예
function compareUsage (customerID, laterYear, month){
    const later     =   getCustomerData().usages(customerID,laterYear,month);
    const earlier   =   getCustomerData().usages(customerID,laterYear-1,month);
    return{laterAmount: later, change: letaer - earlier};
}


7.테스트
8.이후 배울 레코드 캠슐화하기와 컬렉션 캠슐화하기를 재귀적으로 적용

*/

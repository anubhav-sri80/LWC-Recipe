import { LightningElement, track, wire } from 'lwc';
import listOfContact from '@salesforce/apex/UtilityClass.listOfContact'
import listOfAccount from '@salesforce/apex/UtilityClass.listOfAccount';

export default class LogicalLWCdemo extends LightningElement {
    @track searchKey;
    @track searchKeyAccount;
    @track contacts;
    @track error;
    @track accounts;
    @track errorAccount;

    @wire(listOfContact,{
        name:'$searchKey'
    
    })

    wiredContact({error,data}){
        if(data){
            this.contacts = data;
        }
        if(error){
            this.error= error;
            /*eslint-disable no-console */
            console.log('Error',error);
        }
    }

    handleChange(event){
        event.preventDefault();
        this.searchKey=event.target.value;
    }

    handleChangeAccount(event){
        event.preventDefault();
        this.searchKeyAccount=event.target.value;
    }
    findAccounts(){
        listOfAccount(
            {name:this.searchKeyAccount}
        )
        .then(result=>{
            this.accounts=result;
            /*eslint-disable no-console */
            console.log('result',result);
        })
        .catch(error=>{
            this.errorAccount=error;
            /*eslint-disable no-console */
            console.log('Error',error);
        });
    }

}
import { Injectable } from '@angular/core';
import axios from 'axios';

type Message ={
    id:string, 
    name:string ,
    profileImage:string ,
    date:string , 
    message:string ,
    reply:string
}

@Injectable({
  providedIn: 'root'
})
export class UserMessagesService {

  DBcustomerMessages:Message[] = []

  customerMessages:any[] =[
  {
    "id": 1,
    "name": "John Doe",
    "profileImage": "https://randomuser.me/api/portraits/men/32.jpg",
    "date": "2025-07-19",
    "message": "This platform has completely transformed how I manage my daily tasks. The new dashboard update is fantastic!",
    "reply": ""
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "profileImage": "https://randomuser.me/api/portraits/women/44.jpg",
    "date": "2025-07-18",
    "message": "I reached out to customer support and received help within minutes. Great experience overall!",
    "reply": ""

  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "profileImage": "https://randomuser.me/api/portraits/women/68.jpg",
    "date": "2025-07-17",
    "message": "I love the clean design and ease of use. It makes collaboration with my team so much easier and more efficient.",
    "reply": ""


  },
  {
    "id": 4,
    "name": "Robert Brown",
    "profileImage": "https://randomuser.me/api/portraits/men/75.jpg",
    "date": "2025-07-16",
    "message": "There was a slight learning curve at first, but the tutorials really helped. Now I use this app every day!",
    "reply": ""

  },
  {
    "id": 5,
    "name": "Emily Davis",
    "profileImage": "https://randomuser.me/api/portraits/women/21.jpg",
    "date": "2025-07-15",
    "message": "Thank you for adding the new analytics feature. It’s exactly what we needed for our reporting process.",
    "reply": ""

  }
]

 // constructor for UserMessagesService
  constructor() { 
    //method call to invoke get queries api
    this.test();
  }


//added function to retrive user messages/queries
async test(){

      //get api call
      await axios.get('https://ecom-backend-ak0w.onrender.com/api/getUserQueries').then((response) => {
     
      let res = response.data.data;
      for(let obj of res){
        this.DBcustomerMessages.push({
          id:obj._id,
          name:obj.userName,
          profileImage:obj.userImage,
          date:obj.userQueryDate,
          message:obj.userMessage,
          reply:obj.reply
        })
      }
       
    }).catch((err)=>{
      console.error('Error fetching queries:', err);  
    })
 }


 //method to send user queries to admin dashboard
 getCustomerMessages() {
    console.log('Fetching customer messages:', this.DBcustomerMessages);
    return this.DBcustomerMessages;

  }

  async setReply(id:string , reply:string){

    try {
      const response = await axios.post(`https://ecom-backend-ak0w.onrender.com/api/reply/${id}`, { reply });
      //console.log('Reply sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending reply:', error);
    }

    this.DBcustomerMessages = this.DBcustomerMessages.filter((item)=>{
        if(item.id === id){
          item.reply = reply
          console.log(`replied to ${JSON.stringify(item)}`)
          return 
        }
        else{
        return item

        }
    })
    return this.customerMessages;
  }


    addReplyToMessage(messageId: number, reply: string, isAdmin: boolean = true) {
    const message = this.customerMessages.find(m => m.id === messageId);
    if (message) {
      if (!message.replies) {
        message.replies = [];
      }
      const newReply = {
        id: message.replies.length + 1,
        name: isAdmin ? "Admin" : "User",
        profileImage: isAdmin 
          ? "https://randomuser.me/api/portraits/men/1.jpg" 
          : "https://randomuser.me/api/portraits/women/1.jpg",
        date: new Date().toISOString().split('T')[0],
        message: reply,
        isAdmin: isAdmin
      };
      message.replies.push(newReply);
    }
    return this.customerMessages;
  }
}

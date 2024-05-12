import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../../environments/environment';
import { AdminService } from '../adminService/admin.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent {
  @ViewChild('messageInput') messageInputRef!: ElementRef;
  @ViewChild('conversationContainer') conversationContainer!: ElementRef;

  firestore: firebase.firestore.Firestore;
  admins: any[] = [];
  conversations: any[] = [];
  selectedAdminId: string = '';
  recieverAdminName: string = '';

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    firebase.initializeApp(environment.firebaseConfig);
    this.firestore = firebase.firestore();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedAdminId = params['adminId'];
    });

    this.loadAdmins();

    const otherAdmin = this.admins.find(
      (admin) => admin.id !== this.selectedAdminId
    );
    this.recieverAdminName = otherAdmin ? otherAdmin.data.adminName : '';

    this.loadConversation();
  }

  ngAfterViewChecked() {
    this.conversationContainer.nativeElement.scrollTop =
      this.conversationContainer.nativeElement.scrollHeight;
  }

  loadAdmins() {
    this.admins = this.adminService.admins;
  }

  loadConversation() {
    this.firestore
      .collection('Conversation')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.conversations.push({ id: doc.id, data: doc.data() });
        });
        this.conversations.sort((a, b) => {
          const timeA = a.data.messageTime;
          const timeB = b.data.messageTime;
          return timeA - timeB;
        });
      });
    this.scrollToBottom();
  }

  sendMessage(message: string) {
    if (this.selectedAdminId) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const newConversation = {
        messageTime: timestamp,
        senderId: this.selectedAdminId,
        messageContent: message,
      };

      this.firestore
        .collection('Conversation')
        .add(newConversation)
        .then((docRef) => {
          this.conversations.push({
            id: docRef.id,
            data: { ...newConversation },
          });
          this.messageInputRef.nativeElement.value = '';
        })
        .catch((error) => {
          console.error('Error adding conversation:', error);
        });
    }
  }

  scrollToBottom() {
    try {
      this.conversationContainer.nativeElement.scrollTop =
        this.conversationContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}

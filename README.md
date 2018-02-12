# Client-Scheduler
This project is to be used in conjuction with the Redtail CRM.

It's purpose is to be an efficient way for Redtail CRM users to schedule appointments with their clients.

The process goes as follows:

1.  Logging in on the home page authenticates the user with their Redtail CRM account using a token based system with the apps API. The username & password is the user's Redtail CRM username & password.

2. The Advisor's Dashboard is where the Redtail user adds some additional information to the app such as an email address, a link that can customized to be shared with their clients (one is generated randomly by default), and a way to create timeslots that the user prefers to meet at. When timeslots are added or removed from the UI they are automatically saved in the app's API database.
    
3. When the user sends the provided link to a client (or the link is found an email signature) the client is shown a month view calendar and when selecting a day the preferred timeslots are presented. If there are conflicts inside the Redtail users CRM Calendar then the timeslots that conflict will not appear in this page. Once a preferred timeslot for a day is chosen the client can now schedule this appointment time with the Redtail User. The client can enter in their Name, Subject, Email address and any additional details they will in a textarea box. When the client clicks the Schedule Appointment button, a calendar item is created in the Redtail CRM using the Subject field as the Subject, the Details textarea as Details and the email address to search the CRM database for the client. If a client is found in Redtail it will be automatically linked to the CRM calendar item so the advisor knows who scheduled with them and already has the profile linked.
    
Further notes:

The Redtail API Key used in this app is not uploaded here but is located in the constants.rb file that is ignored by git and given the variable name API_KEY.

import os
import requests
import json

from dotenv import load_dotenv
from infobip_channels.email.channel import EmailChannel

load_dotenv('./.env')

BASE_URL = f"{os.environ.get('INFOBIPURL')}"
API = f"{os.getenv('API')}"

SENDER_EMAIL = 'mtuenmuk@uwo.ca'
SUBJECT = "New Applicant Referal"
PROJNAME = "PROJECTNAME"


def sendRef(revEmail, contactName, applicant, appEmail,resume=None):
    message = f"Dear {contactName},\n\n{applicant} has recieved 5 likes on {PROJNAME} from your devplopers. {applicant}'s contact is {appEmail} attached {applicant}'s resumé.\n\nThank you for using {PROJNAME}.\n\nSincerely,\n{PROJNAME} Team"
    
    print(BASE_URL)
    print(API)

    email = EmailChannel.from_auth_params({
            "base_url": BASE_URL,
            "api_key": API
        })

    response = email.send_email_message({
        "from": SENDER_EMAIL,
        "to": revEmail,
        "subject": SUBJECT,
        "text": str(message)
    })

    print(response)

if __name__ == "__main__":
    sendRef("mtuenmuk@uwo.ca", 'Mars', 'Marc', 'mtuenmuk@uwo.ca')
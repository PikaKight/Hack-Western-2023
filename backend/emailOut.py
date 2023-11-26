import base64
import os
import requests
import json

from dotenv import load_dotenv
from infobip_channels.email.channel import EmailChannel
from database import getOne
# Add attachments as array of binary object

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

def sendRefAPI(revEmail, contactName, applicant, appEmail, filename, resume):
    message = f"Dear {contactName},\n\n{applicant} has recieved 5 likes on {PROJNAME} from your devplopers. {applicant}'s contact is {appEmail} attached {applicant}'s resumé.\n\nThank you for using {PROJNAME}.\n\nSincerely,\n{PROJNAME} Team"

    api = f"App {API}"
    url = f"{BASE_URL}/email/3/send"
    headers = {
        'Authorization': api
    }

   
    files = {
        'attachment': (filename, resume)
    }
    
    data = {
        "from": SENDER_EMAIL,
        "to": revEmail,
        "subject": SUBJECT,
        "text": str(message)
    }

    response = requests.post(url, headers=headers, data=data, files=files)  

    print(response.json())

if __name__ == "__main__":
    # sendRef("mtuenmuk@uwo.ca", 'Mars', 'Marc', 'mtuenmuk@uwo.ca')
    pass
    # sendRefAPI("mtuenmuk@uwo.ca", 'Mars', 'Marc', 'mtuenmuk@uwo.ca', resume, filename)
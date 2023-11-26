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
PROJNAME = "GitTogether"


def sendRef(revEmail, contactName, applicant, appEmail, resumeLink):
    message = f"Dear {contactName},\n\n{applicant} has recieved 5 likes on {PROJNAME} from your devplopers. {applicant}'s contact is {appEmail} and here is the link to their resumé.\n\n{resumeLink}\n\nThank you for using {PROJNAME}.\n\nSincerely,\n{PROJNAME} Team"
    
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
    sendRef("mtuenmuk@uwo.ca", 'Mars', 'Marc', 'mtuenmuk@uwo.ca', "https://drive.google.com/file/d/1TrZZhivIBYYbJLGj4oC6pdrRnLUaqdX5/view?usp=sharing")
    # sendRefAPI("mtuenmuk@uwo.ca", 'Mars', 'Marc', 'mtuenmuk@uwo.ca', resume, filename)
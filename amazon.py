import requests
import json
import datetime

# Your Amazon Selling Partner API credentials
client_id = 'amzn1.application-oa2-client.13ec9c17b86d4ea28a032cda084c9657'
client_secret = 'a056db3bb2b97a597b5dd29301665c921374999dc9cd18352417f6728b0217de'
refresh_token = 'YOUR_REFRESH_TOKEN'

# Amazon Selling Partner API endpoints
auth_endpoint = 'https://api.amazon.com/auth/o2/token'
shipment_tracking_endpoint = 'https://sellingpartnerapi.amazon.com/shipping/v1/shipmentTracking'

# Get the current date
current_date = datetime.datetime.now().isoformat()

# Authenticate and obtain an access token
def get_access_token():
    auth_data = {
        'grant_type': 'refresh_token',
        'client_id': client_id,
        'client_secret': client_secret
    }

    response = requests.post(auth_endpoint, data=auth_data)
    if response.status_code == 200:
        access_token = response.json()['access_token']
        return access_token
    else:
        print("Error getting access token:", response.status_code)
        return None

# Send shipment tracking information
def send_tracking_info(access_token, shipment_id, carrier_code, tracking_number):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }

    tracking_data = {
        "shipmentId": shipment_id,
        "trackingNumber": tracking_number,
        "carrierCode": carrier_code,
        "shipDate": current_date
    }

    response = requests.post(shipment_tracking_endpoint, headers=headers, data=json.dumps(tracking_data))
    
    if response.status_code == 200:
        print("Shipment tracking information submitted successfully.")
    else:
        print("Error submitting shipment tracking information:", response.status_code, response.text)

if __name__ == "__main__":
    access_token = get_access_token()
    print(access_token)
    if access_token:
        # Replace these values with your shipment details
        shipment_id = 'YOUR_SHIPMENT_ID'
        carrier_code = 'YOUR_CARRIER_CODE'
        tracking_number = 'YOUR_TRACKING_NUMBER'
        
        send_tracking_info(access_token, shipment_id, carrier_code, tracking_number)

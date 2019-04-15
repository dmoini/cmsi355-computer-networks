import re

def is_multicast_address(dd):
    valid_address = re.compile(r'^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])$')
    if not valid_address.match(dd):
        return 'Please enter a valid dotted-decimal address'
    first_octet = int(dd[:dd.find('.')])
    return 224 <= first_octet <= 239
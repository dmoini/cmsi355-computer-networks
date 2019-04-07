def is_multicast_address(dd):
    first_octet = int(dd[:dd.find('.')])
    return 224 <= first_octet <= 239
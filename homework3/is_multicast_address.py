def is_multicast_address(dd):
    # TODO: check if valid with regex
    first_octet = int(dd[:dd.find('.')])
    return 224 <= first_octet <= 239
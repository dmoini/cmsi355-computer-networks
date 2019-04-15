import re
BIT_LENGTH = 32
BIT_CHUNK = 8

"""
cidr in form of ddd.ddd.ddd.ddd/m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_dotted_decimal(cidr):
    valid_cidr = re.compile(r'^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\/([0-9]|[1-2][0-9]|3[0-2])$')
    if not valid_cidr.match(cidr):
        return 'Please enter a valid CIDR address'
    old_dd, mask = cidr.split('/')
    mask = int(mask)
    binary = dotted_decimal_to_binary(old_dd, mask)
    return binary_to_dotted_decimal(binary)

def dotted_decimal_to_binary(dd, mask):
    chunks = dd.split('.')
    bits = ''
    for c in chunks:
        octet = bin(int(c))[2:]
        if len(octet) < BIT_CHUNK:
            octet = '0' * (BIT_CHUNK - len(octet)) + octet
        bits += octet
    return bits[:mask] + '0' * (BIT_LENGTH - mask)

def binary_to_dotted_decimal(b):
    dd = [0 for x in range(4)]
    for i in range(0, BIT_LENGTH, BIT_CHUNK):
        # chunk = b[i:i + 8]
        dd[i // 8] = str(int(b[i:i + 8], 2))
    return '.'.join(dd)
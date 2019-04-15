import re

BIT_LENGTH = 32
CHUNK_LENGTH = 8

"""
cidr in form of ddd.ddd.ddd.ddd/m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_binary(cidr):
    valid_cidr = re.compile(r'^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\/([0-9]|[1-2][0-9]|3[0-2])$')
    if not valid_cidr.match(cidr):
        return "Please enter a valid CIDR address"
    address, mask = cidr.split('/')
    return (address_to_binary(address), mask_to_binary(int(mask)))

def address_to_binary(address):
    binary_address = ''
    address_arr = address.split('.')
    for a in address_arr:
        bits = bin(int(a))[2:]
        if len(bits) < 8:
            bits = '0' * (CHUNK_LENGTH - len(bits)) + bits
        binary_address += bits
    return binary_address

def mask_to_binary(mask):
    return '1' * mask + '0' * (BIT_LENGTH - mask)
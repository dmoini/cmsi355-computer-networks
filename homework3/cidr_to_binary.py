BIT_LENGTH = 32

"""
cidr in form of ddd.ddd.ddd.ddd/m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_binary(cidr):
    # TODO: check if valid with regex
    address, mask = cidr.split('/')
    # slash_index = cidr.find('/')
    # ip = cidr[:slash_index].strip()
    # mask = cidr[slash_index + 2:].strip()
    
    # print(address, mask)
    # print(mask_to_binary(int(mask)))

    return (address_to_binary(address), mask_to_binary(int(mask)))

def address_to_binary(address):
    binary_address = ''
    address_arr = address.split('.')
    print(address_arr)
    pass

def mask_to_binary(mask):
    return '1' * mask + '0' * (BIT_LENGTH - mask)

cidr = '128.211.0.0/16'
print(cidr_to_binary(cidr))
BIT_LENGTH = 32
BIT_CHUNK = 8

"""
cidr in form of ddd.ddd.ddd.ddd/m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_dotted_decimal(cidr):
    # TODO: check if valid with regex
    old_dd, mask = cidr.split('/')
    # slash_index = cidr.find('/')
    # old_dd = cidr[:slash_index].strip()
    mask = int(mask)
    old_bits = dotted_decimal_to_bits(old_dd)
    new_bits = old_bits[:mask] + '0' * (BIT_LENGTH - mask)
    new_dd = ''
    for b in range(0, BIT_LENGTH, BIT_CHUNK):
        new_dd += str(int(new_bits[b: b + 8], 2)) + ('.' if b < BIT_LENGTH - BIT_CHUNK else '')
    return new_dd

def dotted_decimal_to_bits(dd):
    chunks = dd.split('.')
    bits = ''
    for c in chunks:
        octet = bin(int(c))[2:]
        if len(octet) < BIT_CHUNK:
            octet = '0' * (BIT_CHUNK - len(octet)) + octet
        bits += octet
    return bits

cidr = '128.211.0.0/16'
print(cidr_to_dotted_decimal(cidr))
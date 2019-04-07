"""
cidr in form of ddd.ddd.ddd.ddd / m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_dotted_decimal(cidr):
    slash_index = cidr.find('/')
    old_dd = cidr[:slash_index].strip()
    mask = int(cidr[slash_index + 1:])
    old_bits = dotted_decimal_to_bits(old_dd)
    new_bits = old_bits[:mask] + '0' * (32 - mask)
    new_dd = ''
    for b in range(0, 32, 8):
        new_dd += str(int(new_bits[b: b + 8], 2)) + ('.' if b < 24 else '')
    return new_dd

    
def dotted_decimal_to_bits(dd):
    chunks = dd.split('.')
    bits = ''
    for c in chunks:
        octet = bin(int(c))[2:]
        if len(octet) < 8:
            octet = '0' * (8 - len(octet)) + octet
        bits += octet
    return bits
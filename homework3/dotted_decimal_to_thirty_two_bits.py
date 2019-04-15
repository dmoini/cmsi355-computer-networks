import re

def dotted_decimal_to_thirty_two_bit(dd):
    valid_address = re.compile(r'^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5])$')
    if not valid_address.match(dd):
        return 'Please enter a valid dotted-decimal address'
    bit_chunks = dd.split('.')
    for i, b in enumerate(bit_chunks):
        bit = bin(int(b))[2:]
        if len(bit) < 8:
            bit = '0' * (8 - len(bit)) + bit
        bit_chunks[i] = bit
    return ''.join(bit_chunks)
import re

MAX_BITS = 128
THIRTY_TWO_BITS = 32
SIXTEEN_BITS = 16
EIGHT_BITS = 8

valid_dotted_quad = re.compile(r'^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$')
valid_cidr = re.compile(r'^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\/([0-9]|[1-2][0-9]|3[0-2])$')
valid_one_twenty_eight_bit_binary = re.compile(r'^([01]{128})$')

# DOTTED DECIMAL QUAD TO BINARY
def dotted_decimal_quad_to_binary(ip):
    if not valid_dotted_quad.match(ip):
        raise ValueError
    bit_chunks = ip.split('.')
    for i, b in enumerate(bit_chunks):
        bit = bin(int(b))[2:]
        if len(bit) < 8:
            bit = '0' * (8 - len(bit)) + bit
        bit_chunks[i] = bit
    return ''.join(bit_chunks)


# IS DOTTED QUAD MULTICAST
def is_dotted_quad_multicast(quad):
    if not valid_dotted_quad.match(quad):
        raise ValueError
    first_octet = int(quad[:quad.find('.')])
    # print(f'FIRST OCTEfirst_octet')
    return 224 <= first_octet <= 239


# CIDR TO DOTTED QUAD
"""
cidr in form of ddd.ddd.ddd.ddd/m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_dotted_quad(cidr):
    if not valid_cidr.match(cidr):
        raise ValueError
    slash_index = cidr.find('/')
    return cidr[:slash_index]

# NOTE: This computes routing prefix. Spent much time on it so I did not want to delete it. -Donovan
# def cidr_to_dotted_quad(cidr):
#     if not valid_cidr.match(cidr):
#         raise ValueError
#     old_dd, mask = cidr.split('/')
#     mask = int(mask)
#     binary = dotted_decimal_to_binary(old_dd, mask)
#     return binary_to_dotted_decimal(binary)

# def dotted_decimal_to_binary(quad, mask):
#     chunks = quad.split('.')
#     bits = ''
#     for c in chunks:
#         octet = bin(int(c))[2:]
#         if len(octet) < EIGHT_BITS:
#             octet = '0' * (EIGHT_BITS - len(octet)) + octet
#         bits += octet
#     return bits[:mask] + '0' * (THIRTY_TWO_BITS - mask)

# def binary_to_dotted_decimal(b):
#     dd = [0 for x in range(4)]
#     for i in range(0, THIRTY_TWO_BITS, EIGHT_BITS):
#         # chunk = b[i:i + 8]
#         dd[i // 8] = str(int(b[i:i + 8], 2))
#     return '.'.join(dd)


# DOTTED QUAD TO CIDR
def dotted_quad_to_cidr(quad, length):
    cidr = quad + '/' + str(length)
    if not valid_cidr.match(cidr):
        raise ValueError
    return cidr


# CIDR ADDRESS TO ADDRESS AND MASK IN BINARY
"""
cidr in form of ddd.ddd.ddd.ddd/m 
    ddd is the decimal value for an octet of the address
    m is the number of one bits in the mask.
"""
def cidr_to_address_and_mask_in_binary(cidr):
    if not valid_cidr.match(cidr):
        raise ValueError
    address = cidr_to_dotted_quad(cidr)
    mask_num = int(cidr[cidr.find('/') + 1:])
    mask = ('1' * mask_num) + ('0' * (THIRTY_TWO_BITS - mask_num))
    return (address, mask)

# NOTE: Spent much time on this as well so I did not want to delete it. -Donovan
# def cidr_to_address_and_mask_in_binary(cidr):
#     if not valid_cidr.match(cidr):
#         raise ValueError
#     address, mask = cidr.split('/')
#     return (address_to_binary(address), mask_to_binary(int(mask)))

# def address_to_binary(address):
#     binary_address = ''
#     address_arr = address.split('.')
#     for a in address_arr:
#         bits = bin(int(a))[2:]
#         if len(bits) < 8:
#             bits = '0' * (EIGHT_BITS - len(bits)) + bits
#         binary_address += bits
#     return binary_address

# def mask_to_binary(mask):
#     return '1' * mask + '0' * (THIRTY_TWO_BITS - mask)


# BINARY TO COLON HEX
def binary_to_colon_hex(b):
    if not valid_one_twenty_eight_bit_binary.match(b):
        raise ValueError
    hex_chunks = ['' for i in range(SIXTEEN_BITS // 2)]
    for i in range(0, MAX_BITS, SIXTEEN_BITS):
        sixteen_bits = b[i:i + SIXTEEN_BITS]
        hex_chunk = hex(int(sixteen_bits,2))[2:].lower()
        hex_chunks[i // SIXTEEN_BITS] = leading_zero_compression(hex_chunk)
    return zero_compression(hex_chunks)

def leading_zero_compression(hc):
    if hc == '0':
        return hc
    non_zero_index = 0
    while hc[non_zero_index] == '0' and non_zero_index < 3:
        non_zero_index += 1
    return hc[non_zero_index:]
    
def zero_compression(hc):
    found_sequence_of_zeroes = False
    zero_sequences_indexes = []
    si, ei = 0, 0  #start and end index
    for i, c in enumerate(hc):
        if c == '0' and not found_sequence_of_zeroes:
            si = i
            found_sequence_of_zeroes = True
        elif c != '0' and found_sequence_of_zeroes:
            ei = i
            found_sequence_of_zeroes = False
            zero_sequences_indexes.append((si, ei))
    if not zero_sequences_indexes:
        return ':'.join(hc)
    zci = max(zero_sequences_indexes, key=max_range)  #zci = zero compression indexes
    new_hc = hc[:zci[0] + 1] + hc[zci[1]:]
    new_hc[zci[0]] = ''
    new_hc = ':'.join(new_hc)
    if new_hc[0] == ':':
        new_hc = ':' + new_hc
    return new_hc

def max_range(a):
    return abs(a[0] - a[1])
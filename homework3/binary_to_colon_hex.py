# b is a 128=bit binary number
def binary_to_colon_hex(b):
    MAX_BITS = 128
    BITS_CHUNK = 16
    hex_chunks = ['' for i in range(8)]
    for i in range(0, MAX_BITS, BITS_CHUNK):
        sixteen_bits = b[i:i + BITS_CHUNK]
        hex_chunk = hex(int(sixteen_bits,2))[2:].upper()
        hex_chunks[i // 16] = leading_zero_compression(hex_chunk)
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
    zci = max(zero_sequences_indexes, key=max_range)  #zci = zero compression indexes
    new_hc = hc[:zci[0] + 1] + hc[zci[1]:]
    new_hc[zci[0]] = ''
    new_hc = ':'.join(new_hc)
    if new_hc[0] == ':':
        new_hc = ':' + new_hc
    return new_hc

def max_range(a):
    return abs(a[0] - a[1])
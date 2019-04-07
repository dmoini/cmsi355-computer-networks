def dotted_decimal_to_thirty_two_bit(dd):
    bit_chunks = dd.split('.')
    for i, b in enumerate(bit_chunks):
        bit = bin(int(b))[2:]
        if len(bit) < 8:
            bit = '0' * (8 - len(bit)) + bit
        bit_chunks[i] = bit
    return ' '.join(bit_chunks)
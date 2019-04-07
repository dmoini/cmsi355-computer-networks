# b is a 128=bit binary number
def binary_to_colon_hex(b):
    colon_hex = ''
    for i in range(0, 128, 8):
        eight_bits = b[i:i + 8]
        hex_chunk = hex(int(eight_bits,2))[2:].upper()
        if colon_hex and colon_hex[-1] == '0' and hex_chunk == '0':
            colon_hex += ':' if (i % 16 != 0 and i < 120) else ''
            continue
        if hex_chunk != '0' and len(hex_chunk) == 1:
            hex_chunk = '0' + hex_chunk
        colon_hex += hex_chunk + (':' if (i % 16 != 0 and i < 120) else '')
    return zero_compression(colon_hex)

def zero_compression(ch):
    found_sequence_of_zeroes = False
    zero_compressed_colon_hex = ''
    for i in range(0, len(ch)):
        if i > 0 and i < len(ch) - 1 and ch[i - 1] == ':' and ch[i] == '0' and ch[i + 1] == ':':
            found_sequence_of_zeroes = True
        if found_sequence_of_zeroes and ch[i] != '0' and ch[i] != ':':
            found_sequence_of_zeroes = False
            zero_compressed_colon_hex += ':'
        if not found_sequence_of_zeroes:
            zero_compressed_colon_hex += ch[i]
    return zero_compressed_colon_hex
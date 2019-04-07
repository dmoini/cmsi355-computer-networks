def cidr_to_dotted_decimal(cidr):
    cidr_int = int(cidr[1:])
    dd = ''
    for c in range(4):
        if cidr_int >= 8:
            dd += '255'
            cidr_int -= 8
        elif cidr_int > 0:
            bit_chunk = '1' * cidr_int + '0' * (8 - cidr_int)
            dd += str(int(bit_chunk, 2))
            cidr_int = 0
        else:
            dd += '0'
        if c < 3:
            dd += '.'
    return dd
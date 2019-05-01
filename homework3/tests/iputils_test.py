import pytest
import iputils

def test_dotted_decimal_quad_to_binary():
    good = [
      ('12.3.8.9', '00001100000000110000100000001001'),
      ('255.255.255.255', '11111111111111111111111111111111'),
      ('100.32.240.96', '01100100001000001111000001100000')]
    bad = ['', 'dog', '100.256.0.0', '10.0', '1..100', '3.-5.2.2']
    for ip, binary in good:
        assert iputils.dotted_decimal_quad_to_binary(ip) == binary
    for ip in bad:
        with pytest.raises(ValueError):
            iputils.dotted_decimal_quad_to_binary(ip)

def test_is_dotted_quad_multicast():
    multicast = ['224.0.0.0', '239.255.255.255', '230.1.8.129']
    not_multicast = ['223.0.0.0', '240.0.1.2', '255.255.255.255']
    bad = ['', 'dog', '100.256.0.0', '10.0', '1..100', '3.-5.2.2']
    for ip in multicast:
        assert iputils.is_dotted_quad_multicast(ip)
    for ip in not_multicast:
        assert not iputils.is_dotted_quad_multicast(ip)
    for ip in bad:
        with pytest.raises(ValueError):
            iputils.is_dotted_quad_multicast(ip)

def test_cidr_to_dotted_quad():
    good = [
      ('12.3.8.9/20', '12.3.8.9'),
      ('5.222.11.3/25', '5.222.11.3'),
      ('100.32.240.96/8', '100.32.240.96')]
    bad = ['', 'dog', '100.256.0.0', '10.0', '1..100', '3.-5.2.2', '1.1.1.1/dog', '1.1.1.1/33']
    for cidr, ip in good:
        assert iputils.cidr_to_dotted_quad(cidr) == ip
    for cidr in bad:
        with pytest.raises(ValueError):
            iputils.dotted_decimal_quad_to_binary(cidr)

def test_dotted_quad_to_cidr():
    good = [
      ('12.3.8.9/20', 20, '12.3.8.9'),
      ('5.222.11.3/25', 25, '5.222.11.3'),
      ('100.32.240.96/32', 32, '100.32.240.96')]
    bad = [
      ('100.256.0.0', 8),
      ('1.1.1.1', 33),
      ('2.3.4.5', 'dog')]
    for cidr, length, quad in good:
        assert iputils.dotted_quad_to_cidr(quad, length) == cidr
    for quad, length in bad:
        with pytest.raises(ValueError):
            iputils.dotted_quad_to_cidr(quad, length)

def test_cidr_to_address_and_mask_in_binary():
    good = [
      ('12.3.8.9/20', '12.3.8.9', '11111111111111111111000000000000'),
      ('5.222.11.3/25', '5.222.11.3', '11111111111111111111111110000000'),
      ('5.222.11.3/1', '5.222.11.3', '10000000000000000000000000000000'),
      ('5.222.11.3/32', '5.222.11.3', '11111111111111111111111111111111'),
      ('100.32.240.96/0', '100.32.240.96', '00000000000000000000000000000000')]
    bad = ['', 'dog', '100.256.0.0', '10.0', '1..100', '3.-5.2.2', '1.1.1.1/dog', '1.1.1.1/33']
    for cidr, ip, mask in good:
        assert iputils.cidr_to_address_and_mask_in_binary(cidr) == (ip, mask)
    for cidr in bad:
        with pytest.raises(ValueError):
            iputils.cidr_to_address_and_mask_in_binary(cidr)

def test_binary_to_colon_hex():
    good = [
      ('0000000000000011' * 8, '3:3:3:3:3:3:3:3'),
      ('1010' * 32, 'aaaa:aaaa:aaaa:aaaa:aaaa:aaaa:aaaa:aaaa'),
      ('11010010' * 15 + '11000011', 'd2d2:d2d2:d2d2:d2d2:d2d2:d2d2:d2d2:d2c3'),
      ('0' * 128, '0:0:0:0:0:0:0:0')]
    bad = ['', '10101', '1'*127+'2']
    for binary, address in good:
        assert iputils.binary_to_colon_hex(binary) == address
    for binary in bad:
        with pytest.raises(ValueError):
            iputils.binary_to_colon_hex(binary)
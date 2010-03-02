#!/usr/bin/env perl
=begin
/**
* Test Perl File
* @module lang.perltest
*/
=cut
use strict;
=begin
/**
* Test Perl Class
* @class PerlTest
* @namespace Perl
*/
=cut

=begin
/**
* Arith Method
* @method arith
*/
=cut
sub arith($);

my %h = (
        'add'   => '+',
        'sub'   => '-',
        'mul'   => '*',
        'div'   => '/',
);

print arith(eval $ARGV[0]), "\n";

sub arith($) {
        my $a = shift;
        ref $a ? eval join $h{$a->[0]}, map arith($_), @{$a}[1..$#$a] : $a;
}



(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.cq.af === region.bh.af)
	{
		return 'on line ' + region.cq.af;
	}
	return 'on lines ' + region.cq.af + ' through ' + region.bh.af;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.db,
		impl.d$,
		impl.dP,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		v: func(record.v),
		aI: record.aI,
		aF: record.aF
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.v;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.aI;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aF) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.db,
		impl.d$,
		impl.dP,
		function(sendToApp, initialModel) {
			var view = impl.d2;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.db,
		impl.d$,
		impl.dP,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.aH && impl.aH(sendToApp)
			var view = impl.d2;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.O);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.dW) && (_VirtualDom_doc.title = title = doc.dW);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.as;
	var onUrlRequest = impl.at;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		aH: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.b3 === next.b3
							&& curr.bn === next.bn
							&& curr.bY.a === next.bY.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		db: function(flags)
		{
			return A3(impl.db, flags, _Browser_getUrl(), key);
		},
		d2: impl.d2,
		d$: impl.d$,
		dP: impl.dP
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { c7: 'hidden', cO: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { c7: 'mozHidden', cO: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { c7: 'msHidden', cO: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { c7: 'webkitHidden', cO: 'webkitvisibilitychange' }
		: { c7: 'hidden', cO: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cg: _Browser_getScene(),
		cA: {
			d8: _Browser_window.pageXOffset,
			d9: _Browser_window.pageYOffset,
			cC: _Browser_doc.documentElement.clientWidth,
			bl: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		cC: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bl: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cg: {
				cC: node.scrollWidth,
				bl: node.scrollHeight
			},
			cA: {
				d8: node.scrollLeft,
				d9: node.scrollTop,
				cC: node.clientWidth,
				bl: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cg: _Browser_getScene(),
			cA: {
				d8: x,
				d9: y,
				cC: _Browser_doc.documentElement.clientWidth,
				bl: _Browser_doc.documentElement.clientHeight
			},
			cZ: {
				d8: x + rect.left,
				d9: y + rect.top,
				cC: rect.width,
				bl: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.c) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.d);
		} else {
			var treeLen = builder.c * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.e) : builder.e;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.c);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.d);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{e: nodeList, c: (len / $elm$core$Array$branchFactor) | 0, d: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $MartinSStewart$elm_audio$Audio$LoopConfig = F2(
	function (loopStart, loopEnd) {
		return {bF: loopEnd, bG: loopStart};
	});
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$zero = 0;
var $MartinSStewart$elm_audio$Audio$audioDefaultConfig = {di: $elm$core$Maybe$Nothing, F: 1, y: $ianmackenzie$elm_units$Quantity$zero};
var $MartinSStewart$elm_audio$Audio$BasicAudio = function (a) {
	return {$: 1, a: a};
};
var $MartinSStewart$elm_audio$Audio$audioWithConfig = F3(
	function (audioSettings, source, startTime) {
		return $MartinSStewart$elm_audio$Audio$BasicAudio(
			{cj: audioSettings, J: source, ah: startTime});
	});
var $MartinSStewart$elm_audio$Audio$audio = F2(
	function (source, startTime) {
		return A3($MartinSStewart$elm_audio$Audio$audioWithConfig, $MartinSStewart$elm_audio$Audio$audioDefaultConfig, source, startTime);
	});
var $MartinSStewart$elm_audio$Audio$audioSourceBufferId = function (_v0) {
	var audioSource = _v0;
	return audioSource.ab;
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $MartinSStewart$elm_audio$Audio$rawBufferId = function (_v0) {
	var bufferId = _v0;
	return bufferId;
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $MartinSStewart$elm_audio$Audio$length = F2(
	function (_v0, source) {
		var audioData_ = _v0;
		return A2(
			$elm$core$Maybe$withDefault,
			$ianmackenzie$elm_units$Quantity$zero,
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.ac;
				},
				A2(
					$elm$core$Dict$get,
					$MartinSStewart$elm_audio$Audio$rawBufferId(
						$MartinSStewart$elm_audio$Audio$audioSourceBufferId(source)),
					audioData_.n)));
	});
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return numSeconds;
};
var $author$project$Lib$Audio$Audio$getAudio = F2(
	function (ad, repo) {
		return A2(
			$elm$core$List$map,
			function (_v0) {
				var sound = _v0.b;
				var _v1 = _v0.c;
				var opt = _v1.a;
				var s = _v1.b;
				if (!opt) {
					var _default = $MartinSStewart$elm_audio$Audio$audioDefaultConfig;
					return A3(
						$MartinSStewart$elm_audio$Audio$audioWithConfig,
						_Utils_update(
							_default,
							{
								di: $elm$core$Maybe$Just(
									A2(
										$MartinSStewart$elm_audio$Audio$LoopConfig,
										$ianmackenzie$elm_units$Duration$seconds(0),
										A2($MartinSStewart$elm_audio$Audio$length, ad, sound)))
							}),
						sound,
						s);
				} else {
					return A2($MartinSStewart$elm_audio$Audio$audio, sound, s);
				}
			},
			repo);
	});
var $MartinSStewart$elm_audio$Audio$Group = function (a) {
	return {$: 0, a: a};
};
var $MartinSStewart$elm_audio$Audio$group = function (audios) {
	return $MartinSStewart$elm_audio$Audio$Group(audios);
};
var $MartinSStewart$elm_audio$Audio$Effect = function (a) {
	return {$: 2, a: a};
};
var $MartinSStewart$elm_audio$Audio$ScaleVolume = function (a) {
	return {$: 0, a: a};
};
var $MartinSStewart$elm_audio$Audio$scaleVolume = F2(
	function (scaleBy, audio_) {
		return $MartinSStewart$elm_audio$Audio$Effect(
			{
				cK: audio_,
				aq: $MartinSStewart$elm_audio$Audio$ScaleVolume(
					{
						cf: A2($elm$core$Basics$max, 0, scaleBy)
					})
			});
	});
var $author$project$Common$audio = F2(
	function (ad, model) {
		return A2(
			$MartinSStewart$elm_audio$Audio$scaleVolume,
			model.P.dh.d3,
			$MartinSStewart$elm_audio$Audio$group(
				A2($author$project$Lib$Audio$Audio$getAudio, ad, model.aT)));
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Lib$Audio$Audio$audioPortFromJS = _Platform_incomingPort('audioPortFromJS', $elm$json$Json$Decode$value);
var $author$project$Lib$Audio$Audio$audioPortToJS = _Platform_outgoingPort('audioPortToJS', $elm$core$Basics$identity);
var $MartinSStewart$elm_audio$Audio$UserMsg = function (a) {
	return {$: 1, a: a};
};
var $MartinSStewart$elm_audio$Audio$AudioData = $elm$core$Basics$identity;
var $MartinSStewart$elm_audio$Audio$audioData = function (_v0) {
	var model = _v0;
	return {n: model.n};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bk: fragment, bn: host, bU: path, bY: port_, b3: protocol, b4: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $MartinSStewart$elm_audio$Audio$getUserModel = function (_v0) {
	var model = _v0;
	return model.A;
};
var $MartinSStewart$elm_audio$Audio$Model = $elm$core$Basics$identity;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $ianmackenzie$elm_units$Duration$inSeconds = function (_v0) {
	var numSeconds = _v0;
	return numSeconds;
};
var $ianmackenzie$elm_units$Duration$inMilliseconds = function (duration) {
	return $ianmackenzie$elm_units$Duration$inSeconds(duration) * 1000;
};
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$core$Basics$round = _Basics_round;
var $ianmackenzie$elm_units$Duration$addTo = F2(
	function (time, duration) {
		return $elm$time$Time$millisToPosix(
			$elm$time$Time$posixToMillis(time) + $elm$core$Basics$round(
				$ianmackenzie$elm_units$Duration$inMilliseconds(duration)));
	});
var $MartinSStewart$elm_audio$Audio$audioStartTime = function (audio_) {
	return A2($ianmackenzie$elm_units$Duration$addTo, audio_.ah, audio_.V);
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $MartinSStewart$elm_audio$Audio$encodeBufferId = function (_v0) {
	var bufferId = _v0;
	return $elm$json$Json$Encode$int(bufferId);
};
var $elm$json$Json$Encode$float = _Json_wrap;
var $MartinSStewart$elm_audio$Audio$encodeDuration = A2($elm$core$Basics$composeR, $ianmackenzie$elm_units$Duration$inMilliseconds, $elm$json$Json$Encode$float);
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $MartinSStewart$elm_audio$Audio$encodeLoopConfig = function (maybeLoop) {
	if (!maybeLoop.$) {
		var loop = maybeLoop.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'loopStart',
					$MartinSStewart$elm_audio$Audio$encodeDuration(loop.bG)),
					_Utils_Tuple2(
					'loopEnd',
					$MartinSStewart$elm_audio$Audio$encodeDuration(loop.bF))
				]));
	} else {
		return $elm$json$Json$Encode$null;
	}
};
var $MartinSStewart$elm_audio$Audio$encodeTime = A2($elm$core$Basics$composeR, $elm$time$Time$posixToMillis, $elm$json$Json$Encode$int);
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $MartinSStewart$elm_audio$Audio$encodeVolumeTimeline = function (volumeTimeline) {
	return A2(
		$elm$json$Json$Encode$list,
		function (_v0) {
			var time = _v0.a;
			var volume = _v0.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'time',
						$MartinSStewart$elm_audio$Audio$encodeTime(time)),
						_Utils_Tuple2(
						'volume',
						$elm$json$Json$Encode$float(volume))
					]));
		},
		$mgold$elm_nonempty_list$List$Nonempty$toList(volumeTimeline));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mgold$elm_nonempty_list$List$Nonempty$map = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			f(x),
			A2($elm$core$List$map, f, xs));
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $MartinSStewart$elm_audio$Audio$volumeTimelines = function (audio_) {
	return A2(
		$elm$core$List$map,
		$mgold$elm_nonempty_list$List$Nonempty$map(
			$elm$core$Tuple$mapFirst(
				function (a) {
					return A2($ianmackenzie$elm_units$Duration$addTo, a, audio_.V);
				})),
		audio_.ao);
};
var $MartinSStewart$elm_audio$Audio$encodeStartSound = F2(
	function (nodeGroupId, audio_) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'action',
					$elm$json$Json$Encode$string('startSound')),
					_Utils_Tuple2(
					'nodeGroupId',
					$elm$json$Json$Encode$int(nodeGroupId)),
					_Utils_Tuple2(
					'bufferId',
					$MartinSStewart$elm_audio$Audio$encodeBufferId(
						$MartinSStewart$elm_audio$Audio$audioSourceBufferId(audio_.J))),
					_Utils_Tuple2(
					'startTime',
					$MartinSStewart$elm_audio$Audio$encodeTime(
						$MartinSStewart$elm_audio$Audio$audioStartTime(audio_))),
					_Utils_Tuple2(
					'startAt',
					$MartinSStewart$elm_audio$Audio$encodeDuration(audio_.y)),
					_Utils_Tuple2(
					'volume',
					$elm$json$Json$Encode$float(audio_.d3)),
					_Utils_Tuple2(
					'volumeTimelines',
					A2(
						$elm$json$Json$Encode$list,
						$MartinSStewart$elm_audio$Audio$encodeVolumeTimeline,
						$MartinSStewart$elm_audio$Audio$volumeTimelines(audio_))),
					_Utils_Tuple2(
					'loop',
					$MartinSStewart$elm_audio$Audio$encodeLoopConfig(audio_.di)),
					_Utils_Tuple2(
					'playbackRate',
					$elm$json$Json$Encode$float(audio_.F))
				]));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x + y;
	});
var $MartinSStewart$elm_audio$Audio$flattenAudio = function (audio_) {
	switch (audio_.$) {
		case 0:
			var group_ = audio_.a;
			return $elm$core$List$concat(
				A2($elm$core$List$map, $MartinSStewart$elm_audio$Audio$flattenAudio, group_));
		case 1:
			var source = audio_.a.J;
			var startTime = audio_.a.ah;
			var settings = audio_.a.cj;
			return _List_fromArray(
				[
					{di: settings.di, V: $ianmackenzie$elm_units$Quantity$zero, F: settings.F, J: source, y: settings.y, ah: startTime, d3: 1, ao: _List_Nil}
				]);
		default:
			var effect = audio_.a;
			var _v1 = effect.aq;
			switch (_v1.$) {
				case 0:
					var scaleVolume_ = _v1.a;
					return A2(
						$elm$core$List$map,
						function (a) {
							return _Utils_update(
								a,
								{d3: scaleVolume_.cf * a.d3});
						},
						$MartinSStewart$elm_audio$Audio$flattenAudio(effect.cK));
				case 1:
					var volumeAt = _v1.a.cB;
					return A2(
						$elm$core$List$map,
						function (a) {
							return _Utils_update(
								a,
								{
									ao: A2($elm$core$List$cons, volumeAt, a.ao)
								});
						},
						$MartinSStewart$elm_audio$Audio$flattenAudio(effect.cK));
				default:
					var duration = _v1.a;
					return A2(
						$elm$core$List$map,
						function (a) {
							return _Utils_update(
								a,
								{
									V: A2($ianmackenzie$elm_units$Quantity$plus, duration, a.V)
								});
						},
						$MartinSStewart$elm_audio$Audio$flattenAudio(effect.cK));
			}
	}
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $MartinSStewart$elm_audio$Audio$encodeSetLoopConfig = F2(
	function (nodeGroupId, loop) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'nodeGroupId',
					$elm$json$Json$Encode$int(nodeGroupId)),
					_Utils_Tuple2(
					'action',
					$elm$json$Json$Encode$string('setLoopConfig')),
					_Utils_Tuple2(
					'loop',
					$MartinSStewart$elm_audio$Audio$encodeLoopConfig(loop))
				]));
	});
var $MartinSStewart$elm_audio$Audio$encodeSetPlaybackRate = F2(
	function (nodeGroupId, playbackRate) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'nodeGroupId',
					$elm$json$Json$Encode$int(nodeGroupId)),
					_Utils_Tuple2(
					'action',
					$elm$json$Json$Encode$string('setPlaybackRate')),
					_Utils_Tuple2(
					'playbackRate',
					$elm$json$Json$Encode$float(playbackRate))
				]));
	});
var $MartinSStewart$elm_audio$Audio$encodeSetVolume = F2(
	function (nodeGroupId, volume) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'nodeGroupId',
					$elm$json$Json$Encode$int(nodeGroupId)),
					_Utils_Tuple2(
					'action',
					$elm$json$Json$Encode$string('setVolume')),
					_Utils_Tuple2(
					'volume',
					$elm$json$Json$Encode$float(volume))
				]));
	});
var $MartinSStewart$elm_audio$Audio$encodeSetVolumeAt = F2(
	function (nodeGroupId, volumeTimelines_) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'nodeGroupId',
					$elm$json$Json$Encode$int(nodeGroupId)),
					_Utils_Tuple2(
					'action',
					$elm$json$Json$Encode$string('setVolumeAt')),
					_Utils_Tuple2(
					'volumeAt',
					A2($elm$json$Json$Encode$list, $MartinSStewart$elm_audio$Audio$encodeVolumeTimeline, volumeTimelines_))
				]));
	});
var $MartinSStewart$elm_audio$Audio$encodeStopSound = function (nodeGroupId) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'action',
				$elm$json$Json$Encode$string('stopSound')),
				_Utils_Tuple2(
				'nodeGroupId',
				$elm$json$Json$Encode$int(nodeGroupId))
			]));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $MartinSStewart$elm_audio$Audio$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $MartinSStewart$elm_audio$Audio$removeAt = F2(
	function (index, l) {
		if (index < 0) {
			return l;
		} else {
			var tail = $elm$core$List$tail(
				A2($elm$core$List$drop, index, l));
			var head = A2($elm$core$List$take, index, l);
			if (tail.$ === 1) {
				return l;
			} else {
				var t = tail.a;
				return A2($elm$core$List$append, head, t);
			}
		}
	});
var $MartinSStewart$elm_audio$Audio$updateAudioState = F2(
	function (_v0, _v1) {
		var nodeGroupId = _v0.a;
		var audioGroup = _v0.b;
		var flattenedAudio = _v1.a;
		var audioState = _v1.b;
		var json = _v1.c;
		var validAudio = A2(
			$elm$core$List$filter,
			function (_v7) {
				var a = _v7.b;
				return _Utils_eq(a.J, audioGroup.J) && (_Utils_eq(
					$MartinSStewart$elm_audio$Audio$audioStartTime(a),
					$MartinSStewart$elm_audio$Audio$audioStartTime(audioGroup)) && _Utils_eq(a.y, audioGroup.y));
			},
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, flattenedAudio));
		var _v2 = A2(
			$MartinSStewart$elm_audio$Audio$find,
			function (_v3) {
				var a = _v3.b;
				return _Utils_eq(a, audioGroup);
			},
			validAudio);
		if (!_v2.$) {
			var _v4 = _v2.a;
			var index = _v4.a;
			return _Utils_Tuple3(
				A2($MartinSStewart$elm_audio$Audio$removeAt, index, flattenedAudio),
				audioState,
				json);
		} else {
			if (validAudio.b) {
				var _v6 = validAudio.a;
				var index = _v6.a;
				var a = _v6.b;
				var encodeValue = F2(
					function (getter, encoder) {
						return _Utils_eq(
							getter(audioGroup),
							getter(a)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
							A2(
								encoder,
								nodeGroupId,
								getter(a)));
					});
				var effects = A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							A2(
							encodeValue,
							function ($) {
								return $.d3;
							},
							$MartinSStewart$elm_audio$Audio$encodeSetVolume),
							A2(
							encodeValue,
							function ($) {
								return $.di;
							},
							$MartinSStewart$elm_audio$Audio$encodeSetLoopConfig),
							A2(
							encodeValue,
							function ($) {
								return $.F;
							},
							$MartinSStewart$elm_audio$Audio$encodeSetPlaybackRate),
							A2(encodeValue, $MartinSStewart$elm_audio$Audio$volumeTimelines, $MartinSStewart$elm_audio$Audio$encodeSetVolumeAt)
						]));
				return _Utils_Tuple3(
					A2($MartinSStewart$elm_audio$Audio$removeAt, index, flattenedAudio),
					A3($elm$core$Dict$insert, nodeGroupId, a, audioState),
					_Utils_ap(effects, json));
			} else {
				return _Utils_Tuple3(
					flattenedAudio,
					A2($elm$core$Dict$remove, nodeGroupId, audioState),
					A2(
						$elm$core$List$cons,
						$MartinSStewart$elm_audio$Audio$encodeStopSound(nodeGroupId),
						json));
			}
		}
	});
var $MartinSStewart$elm_audio$Audio$diffAudioState = F3(
	function (nodeGroupIdCounter, audioState, newAudio) {
		var _v0 = A3(
			$elm$core$List$foldl,
			$MartinSStewart$elm_audio$Audio$updateAudioState,
			_Utils_Tuple3(
				$MartinSStewart$elm_audio$Audio$flattenAudio(newAudio),
				audioState,
				_List_Nil),
			$elm$core$Dict$toList(audioState));
		var newAudioLeft = _v0.a;
		var newAudioState = _v0.b;
		var json2 = _v0.c;
		var _v1 = A3(
			$elm$core$List$foldl,
			F2(
				function (audioLeft, _v2) {
					var counter = _v2.a;
					var audioState_ = _v2.b;
					var json_ = _v2.c;
					return _Utils_Tuple3(
						counter + 1,
						A3($elm$core$Dict$insert, counter, audioLeft, audioState_),
						A2(
							$elm$core$List$cons,
							A2($MartinSStewart$elm_audio$Audio$encodeStartSound, counter, audioLeft),
							json_));
				}),
			_Utils_Tuple3(nodeGroupIdCounter, newAudioState, json2),
			newAudioLeft);
		var newNodeGroupIdCounter = _v1.a;
		var newAudioState2 = _v1.b;
		var json3 = _v1.c;
		return _Utils_Tuple3(newAudioState2, newNodeGroupIdCounter, json3);
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $MartinSStewart$elm_audio$Audio$encodeAudioLoadRequest = F2(
	function (index, audioLoad) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'audioUrl',
					$elm$json$Json$Encode$string(audioLoad.aa)),
					_Utils_Tuple2(
					'requestId',
					$elm$json$Json$Encode$int(index))
				]));
	});
var $MartinSStewart$elm_audio$Audio$flattenAudioCmd = function (audioCmd) {
	if (!audioCmd.$) {
		var data = audioCmd.a;
		return _List_fromArray(
			[data]);
	} else {
		var list = audioCmd.a;
		return $elm$core$List$concat(
			A2($elm$core$List$map, $MartinSStewart$elm_audio$Audio$flattenAudioCmd, list));
	}
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $MartinSStewart$elm_audio$Audio$encodeAudioCmd = F2(
	function (_v0, audioCmd) {
		var model = _v0;
		var flattenedAudioCmd = $MartinSStewart$elm_audio$Audio$flattenAudioCmd(audioCmd);
		var newPendingRequests = A2(
			$elm$core$List$indexedMap,
			F2(
				function (index, request) {
					return _Utils_Tuple2(model.H + index, request);
				}),
			flattenedAudioCmd);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					f: A2(
						$elm$core$Dict$union,
						model.f,
						$elm$core$Dict$fromList(newPendingRequests)),
					H: model.H + $elm$core$List$length(flattenedAudioCmd)
				}),
			A2(
				$elm$json$Json$Encode$list,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$map,
					function (_v1) {
						var index = _v1.a;
						var value = _v1.b;
						return A2($MartinSStewart$elm_audio$Audio$encodeAudioLoadRequest, index, value);
					},
					newPendingRequests)));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $MartinSStewart$elm_audio$Audio$initHelper = F3(
	function (audioPort, audioFunc, _v0) {
		var model = _v0.a;
		var cmds = _v0.b;
		var audioCmds = _v0.c;
		var _v1 = A3(
			$MartinSStewart$elm_audio$Audio$diffAudioState,
			0,
			$elm$core$Dict$empty,
			A2(
				audioFunc,
				{n: $elm$core$Dict$empty},
				model));
		var audioState = _v1.a;
		var newNodeGroupIdCounter = _v1.b;
		var json = _v1.c;
		var initialModel = {N: audioState, U: newNodeGroupIdCounter, f: $elm$core$Dict$empty, H: 0, I: $elm$core$Maybe$Nothing, n: $elm$core$Dict$empty, A: model};
		var _v2 = A2($MartinSStewart$elm_audio$Audio$encodeAudioCmd, initialModel, audioCmds);
		var initialModel2 = _v2.a;
		var audioRequests = _v2.b;
		var portMessage = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'audio',
					A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, json)),
					_Utils_Tuple2('audioCmds', audioRequests)
				]));
		return _Utils_Tuple2(
			initialModel2,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Platform$Cmd$map, $MartinSStewart$elm_audio$Audio$UserMsg, cmds),
						audioPort(portMessage)
					])));
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $MartinSStewart$elm_audio$Audio$FromJSMsg = function (a) {
	return {$: 0, a: a};
};
var $MartinSStewart$elm_audio$Audio$JsonParseError = function (a) {
	return {$: 3, a: a};
};
var $MartinSStewart$elm_audio$Audio$AudioLoadFailed = function (a) {
	return {$: 1, a: a};
};
var $MartinSStewart$elm_audio$Audio$AudioLoadSuccess = function (a) {
	return {$: 0, a: a};
};
var $MartinSStewart$elm_audio$Audio$InitAudioContext = function (a) {
	return {$: 2, a: a};
};
var $MartinSStewart$elm_audio$Audio$BufferId = $elm$core$Basics$identity;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $MartinSStewart$elm_audio$Audio$decodeBufferId = A2($elm$json$Json$Decode$map, $elm$core$Basics$identity, $elm$json$Json$Decode$int);
var $MartinSStewart$elm_audio$Audio$FailedToDecode = 0;
var $MartinSStewart$elm_audio$Audio$NetworkError = 1;
var $MartinSStewart$elm_audio$Audio$UnknownError = 2;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $MartinSStewart$elm_audio$Audio$decodeLoadError = A2(
	$elm$json$Json$Decode$andThen,
	function (value) {
		switch (value) {
			case 'NetworkError':
				return $elm$json$Json$Decode$succeed(1);
			case 'MediaDecodeAudioDataUnknownContentType':
				return $elm$json$Json$Decode$succeed(0);
			case 'DOMException: The buffer passed to decodeAudioData contains an unknown content type.':
				return $elm$json$Json$Decode$succeed(0);
			default:
				return $elm$json$Json$Decode$succeed(2);
		}
	},
	$elm$json$Json$Decode$string);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $MartinSStewart$elm_audio$Audio$decodeFromJSMsg = A2(
	$elm$json$Json$Decode$andThen,
	function (value) {
		switch (value) {
			case 0:
				return A3(
					$elm$json$Json$Decode$map2,
					F2(
						function (requestId, error) {
							return $MartinSStewart$elm_audio$Audio$AudioLoadFailed(
								{ad: error, av: requestId});
						}),
					A2($elm$json$Json$Decode$field, 'requestId', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'error', $MartinSStewart$elm_audio$Audio$decodeLoadError));
			case 1:
				return A4(
					$elm$json$Json$Decode$map3,
					F3(
						function (requestId, bufferId, duration) {
							return $MartinSStewart$elm_audio$Audio$AudioLoadSuccess(
								{
									ab: bufferId,
									ac: $ianmackenzie$elm_units$Duration$seconds(duration),
									av: requestId
								});
						}),
					A2($elm$json$Json$Decode$field, 'requestId', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'bufferId', $MartinSStewart$elm_audio$Audio$decodeBufferId),
					A2($elm$json$Json$Decode$field, 'durationInSeconds', $elm$json$Json$Decode$float));
			case 2:
				return A2(
					$elm$json$Json$Decode$map,
					function (samplesPerSecond) {
						return $MartinSStewart$elm_audio$Audio$InitAudioContext(
							{I: samplesPerSecond});
					},
					A2($elm$json$Json$Decode$field, 'samplesPerSecond', $elm$json$Json$Decode$int));
			default:
				return $elm$json$Json$Decode$succeed(
					$MartinSStewart$elm_audio$Audio$JsonParseError(
						{
							ad: 'Type ' + ($elm$core$String$fromInt(value) + ' not handled.')
						}));
		}
	},
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$int));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $MartinSStewart$elm_audio$Audio$fromJSPortSub = function (json) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $MartinSStewart$elm_audio$Audio$decodeFromJSMsg, json);
	if (!_v0.$) {
		var value = _v0.a;
		return $MartinSStewart$elm_audio$Audio$FromJSMsg(value);
	} else {
		var error = _v0.a;
		return $MartinSStewart$elm_audio$Audio$FromJSMsg(
			$MartinSStewart$elm_audio$Audio$JsonParseError(
				{
					ad: $elm$json$Json$Decode$errorToString(error)
				}));
	}
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $MartinSStewart$elm_audio$Audio$subscriptions = F2(
	function (app, _v0) {
		var model = _v0;
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					A2(
					$elm$core$Platform$Sub$map,
					$MartinSStewart$elm_audio$Audio$UserMsg,
					A2(
						app.dP,
						$MartinSStewart$elm_audio$Audio$audioData(model),
						model.A)),
					app.cL.c4($MartinSStewart$elm_audio$Audio$fromJSPortSub)
				]));
	});
var $MartinSStewart$elm_audio$Audio$File = $elm$core$Basics$identity;
var $MartinSStewart$elm_audio$Audio$flip = F3(
	function (func, a, b) {
		return A2(func, b, a);
	});
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $MartinSStewart$elm_audio$Audio$updateHelper = F4(
	function (audioPort, audioFunc, userUpdate, _v0) {
		var model = _v0;
		var audioData_ = $MartinSStewart$elm_audio$Audio$audioData(model);
		var _v1 = A2(userUpdate, audioData_, model.A);
		var newUserModel = _v1.a;
		var userCmd = _v1.b;
		var audioCmds = _v1.c;
		var _v2 = A3(
			$MartinSStewart$elm_audio$Audio$diffAudioState,
			model.U,
			model.N,
			A2(audioFunc, audioData_, newUserModel));
		var audioState = _v2.a;
		var newNodeGroupIdCounter = _v2.b;
		var json = _v2.c;
		var newModel = _Utils_update(
			model,
			{N: audioState, U: newNodeGroupIdCounter, A: newUserModel});
		var _v3 = A2($MartinSStewart$elm_audio$Audio$encodeAudioCmd, newModel, audioCmds);
		var newModel2 = _v3.a;
		var audioRequests = _v3.b;
		var portMessage = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'audio',
					A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, json)),
					_Utils_Tuple2('audioCmds', audioRequests)
				]));
		return _Utils_Tuple2(
			newModel2,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Platform$Cmd$map, $MartinSStewart$elm_audio$Audio$UserMsg, userCmd),
						audioPort(portMessage)
					])));
	});
var $MartinSStewart$elm_audio$Audio$update = F3(
	function (app, msg, _v0) {
		var model = _v0;
		if (msg.$ === 1) {
			var userMsg = msg.a;
			return A4(
				$MartinSStewart$elm_audio$Audio$updateHelper,
				app.cL.dX,
				app.cK,
				A2($MartinSStewart$elm_audio$Audio$flip, app.d$, userMsg),
				model);
		} else {
			var response = msg.a;
			switch (response.$) {
				case 0:
					var requestId = response.a.av;
					var bufferId = response.a.ab;
					var duration = response.a.ac;
					var _v3 = A2($elm$core$Dict$get, requestId, model.f);
					if (!_v3.$) {
						var pendingRequest = _v3.a;
						var sourceData = A3(
							$elm$core$Dict$insert,
							$MartinSStewart$elm_audio$Audio$rawBufferId(bufferId),
							{ac: duration},
							model.n);
						var source = $elm$core$Result$Ok(
							{ab: bufferId});
						var maybeUserMsg = A2(
							$MartinSStewart$elm_audio$Audio$find,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$Tuple$first,
								$elm$core$Basics$eq(source)),
							$mgold$elm_nonempty_list$List$Nonempty$toList(pendingRequest.B));
						if (!maybeUserMsg.$) {
							var _v5 = maybeUserMsg.a;
							var userMsg = _v5.b;
							return A4(
								$MartinSStewart$elm_audio$Audio$updateHelper,
								app.cL.dX,
								app.cK,
								A2($MartinSStewart$elm_audio$Audio$flip, app.d$, userMsg),
								_Utils_update(
									model,
									{
										f: A2($elm$core$Dict$remove, requestId, model.f),
										n: sourceData
									}));
						} else {
							return A4(
								$MartinSStewart$elm_audio$Audio$updateHelper,
								app.cL.dX,
								app.cK,
								A2(
									$MartinSStewart$elm_audio$Audio$flip,
									app.d$,
									$mgold$elm_nonempty_list$List$Nonempty$head(pendingRequest.B).b),
								_Utils_update(
									model,
									{
										f: A2($elm$core$Dict$remove, requestId, model.f),
										n: sourceData
									}));
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 1:
					var requestId = response.a.av;
					var error = response.a.ad;
					var _v6 = A2($elm$core$Dict$get, requestId, model.f);
					if (!_v6.$) {
						var pendingRequest = _v6.a;
						var a = $elm$core$Result$Err(error);
						var b = A2(
							$MartinSStewart$elm_audio$Audio$find,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$Tuple$first,
								$elm$core$Basics$eq(a)),
							$mgold$elm_nonempty_list$List$Nonempty$toList(pendingRequest.B));
						if (!b.$) {
							var _v8 = b.a;
							var userMsg = _v8.b;
							return A4(
								$MartinSStewart$elm_audio$Audio$updateHelper,
								app.cL.dX,
								app.cK,
								A2($MartinSStewart$elm_audio$Audio$flip, app.d$, userMsg),
								_Utils_update(
									model,
									{
										f: A2($elm$core$Dict$remove, requestId, model.f)
									}));
						} else {
							return A4(
								$MartinSStewart$elm_audio$Audio$updateHelper,
								app.cL.dX,
								app.cK,
								A2(
									$MartinSStewart$elm_audio$Audio$flip,
									app.d$,
									$mgold$elm_nonempty_list$List$Nonempty$head(pendingRequest.B).b),
								_Utils_update(
									model,
									{
										f: A2($elm$core$Dict$remove, requestId, model.f)
									}));
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 2:
					var samplesPerSecond = response.a.I;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								I: $elm$core$Maybe$Just(samplesPerSecond)
							}),
						$elm$core$Platform$Cmd$none);
				default:
					var error = response.a.ad;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $ianmackenzie$elm_units$Duration$milliseconds = function (numMilliseconds) {
	return $ianmackenzie$elm_units$Duration$seconds(0.001 * numMilliseconds);
};
var $MartinSStewart$elm_audio$Audio$Offset = function (a) {
	return {$: 2, a: a};
};
var $MartinSStewart$elm_audio$Audio$offsetBy = F2(
	function (offset_, audio_) {
		return $MartinSStewart$elm_audio$Audio$Effect(
			{
				cK: audio_,
				aq: $MartinSStewart$elm_audio$Audio$Offset(offset_)
			});
	});
var $MartinSStewart$elm_audio$Audio$withAudioOffset = function (app) {
	return _Utils_update(
		app,
		{
			cK: F2(
				function (audioData_, model) {
					return A2(
						$MartinSStewart$elm_audio$Audio$offsetBy,
						$ianmackenzie$elm_units$Duration$milliseconds(50),
						A2(app.cK, audioData_, model));
				})
		});
};
var $MartinSStewart$elm_audio$Audio$elementWithAudio = A2(
	$elm$core$Basics$composeR,
	$MartinSStewart$elm_audio$Audio$withAudioOffset,
	function (app) {
		return $elm$browser$Browser$element(
			{
				db: A2(
					$elm$core$Basics$composeR,
					app.db,
					A2($MartinSStewart$elm_audio$Audio$initHelper, app.cL.dX, app.cK)),
				dP: $MartinSStewart$elm_audio$Audio$subscriptions(app),
				d$: $MartinSStewart$elm_audio$Audio$update(app),
				d2: function (model) {
					return A2(
						$elm$html$Html$map,
						$MartinSStewart$elm_audio$Audio$UserMsg,
						A2(
							app.d2,
							$MartinSStewart$elm_audio$Audio$audioData(model),
							$MartinSStewart$elm_audio$Audio$getUserModel(model)));
				}
			});
	});
var $author$project$Base$NullMsg = {$: 11};
var $MartinSStewart$elm_audio$Audio$AudioCmdGroup = function (a) {
	return {$: 1, a: a};
};
var $MartinSStewart$elm_audio$Audio$cmdNone = $MartinSStewart$elm_audio$Audio$AudioCmdGroup(_List_Nil);
var $author$project$Base$LSInfo = function (volume) {
	return {d3: volume};
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Lib$LocalStorage$LocalStorage$decodeLSInfo = function (info) {
	var oldvol = A2(
		$elm$core$Result$withDefault,
		0.5,
		A2(
			$elm$json$Json$Decode$decodeString,
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['volume']),
				$elm$json$Json$Decode$float),
			info));
	return $author$project$Base$LSInfo(oldvol);
};
var $author$project$MainConfig$plHeight = 1080;
var $author$project$MainConfig$plWidth = 1920;
var $author$project$Lib$Coordinate$Coordinates$plScale = $author$project$MainConfig$plWidth / $author$project$MainConfig$plHeight;
var $author$project$Lib$Coordinate$Coordinates$getStartPoint = function (_v0) {
	var w = _v0.a;
	var h = _v0.b;
	var fw = h * $author$project$Lib$Coordinate$Coordinates$plScale;
	var fh = w / $author$project$Lib$Coordinate$Coordinates$plScale;
	return (_Utils_cmp(w / h, $author$project$Lib$Coordinate$Coordinates$plScale) > 0) ? _Utils_Tuple2((w - fw) / 2, 0) : _Utils_Tuple2(0, (h - fh) / 2);
};
var $author$project$Base$Active = 0;
var $author$project$MainConfig$initScene = 'Logo';
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $author$project$Common$initGlobalData = {
	cT: $author$project$MainConfig$initScene,
	cU: $elm$time$Time$millisToPosix(0),
	c1: $elm$core$Maybe$Nothing,
	dc: {
		cM: _Utils_Tuple2(1920, 1080),
		dx: 1080,
		dA: 1920,
		dH: $elm$core$Dict$empty,
		dK: 0,
		dM: 0
	},
	dd: A2($elm$core$Array$repeat, 256, false),
	de: A2($elm$core$Array$repeat, 256, false),
	dh: $author$project$Lib$LocalStorage$LocalStorage$decodeLSInfo(''),
	dp: false,
	dq: _Utils_Tuple2(0, 0),
	dE: 0,
	dN: 0
};
var $author$project$Scenes$SceneSettings$NullSceneData = {$: 2};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableEmpty = {$: 5};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified = {$: 0};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$Renderable = $elm$core$Basics$identity;
var $linsyking$elm_canvas$Canvas$empty = {l: _List_Nil, q: $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified, r: $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableEmpty};
var $author$project$Scenes$SceneSettings$nullSceneT = {
	db: F2(
		function (_v0, _v1) {
			return $author$project$Scenes$SceneSettings$NullSceneData;
		}),
	d$: F2(
		function (env, m) {
			return _Utils_Tuple3(m, _List_Nil, env);
		}),
	d2: F2(
		function (_v2, _v3) {
			return $linsyking$elm_canvas$Canvas$empty;
		})
};
var $author$project$Main$initModel = {aT: _List_Nil, cS: $author$project$Scenes$SceneSettings$NullSceneData, P: $author$project$Common$initGlobalData, cT: $author$project$Scenes$SceneSettings$nullSceneT, dU: 0, dZ: $elm$core$Maybe$Nothing};
var $author$project$Lib$Scene$Base$NullSceneInitData = {$: 3};
var $author$project$MainConfig$initSceneSettings = $author$project$Lib$Scene$Base$NullSceneInitData;
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCInitData = {$: 16};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoryAnimationModel = function (a) {
	return {$: 14, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive = {$: 0};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$Box = F2(
	function (offSet, size) {
		return {bT: offSet, ag: size};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCModel = {$: 0};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData = {
	aM: _Utils_Tuple2(0, 0),
	bj: $elm$core$Dict$empty,
	c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCModel,
	bm: _List_Nil,
	bo: 0,
	dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive,
	bK: 0,
	bZ: _Utils_Tuple2(0, 0),
	cl: A2(
		$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
		_Utils_Tuple2(0, 0),
		_Utils_Tuple2(0, 0)),
	ag: _Utils_Tuple2(0, 0),
	cx: 0,
	cz: _Utils_Tuple2(0, 0)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Base$nullModel = {Y: 0};
var $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 3)) {
			return _Utils_update(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoryAnimationModel($author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Base$nullModel)
				});
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$DestroyTileMap = {$: 32};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitEnemyMsg = function (a) {
	return {$: 7, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitPlayerMsg = function (a) {
	return {$: 6, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitStartMenuMsg = {$: 30};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent = {$: 0};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCShakeCameraMsg = function (a) {
	return {$: 17, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoryMapMsg = {$: 29};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg = function (a) {
	return {$: 31, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$StopShakeCameraMsg = {$: 33};
var $author$project$Lib$Tools$KeyCode$capsLock = 20;
var $author$project$Lib$Tools$KeyCode$enter = 13;
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Lib$Tools$KeyCode$key_a = 65;
var $author$project$Lib$Tools$KeyCode$key_d = 68;
var $author$project$Lib$Tools$KeyCode$key_s = 83;
var $author$project$Lib$Tools$KeyCode$key_w = 87;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Lib$Tools$KeyCode$shift = 16;
var $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$updateModel = F2(
	function (env, d) {
		var omodel = function () {
			var _v1 = d.c5;
			if (_v1.$ === 14) {
				var m = _v1.a;
				return m;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Base$nullModel;
			}
		}();
		var nmodel = _Utils_update(
			omodel,
			{Y: omodel.Y + 1});
		var nd = _Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoryAnimationModel(nmodel)
			});
		return function (_v0) {
			var xx = _v0.a;
			var yy = _v0.b;
			var zz = _v0.c;
			return _Utils_Tuple3(
				xx,
				yy,
				function (e) {
					return _Utils_update(
						e,
						{
							S: function (gdd) {
								return _Utils_update(
									gdd,
									{dp: false});
							}(e.S)
						});
				}(zz));
		}(
			A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$enter, env.S.dd)) ? _Utils_Tuple3(
				nd,
				_List_fromArray(
					[
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitStartMenuMsg),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_d, false))),
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$DestroyTileMap),
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$StopShakeCameraMsg)
					]),
				env) : ((!omodel.Y) ? _Utils_Tuple3(
				nd,
				_List_fromArray(
					[
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoryMapMsg),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitPlayerMsg(
							_Utils_Tuple2(600, 800))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCShakeCameraMsg(1600)),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_d, true))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_w, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_a, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_s, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$shift, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$capsLock, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitEnemyMsg(
							_List_fromArray(
								[
									{
									dt: _Utils_Tuple2(200, -300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(400, -600),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(400, -800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(400, -800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(2)
								},
									{
									dt: _Utils_Tuple2(600, -1000),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(800, -1300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(1000, -1700),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(1300, -2000),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(1500, -2400),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(1900, -12800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(2300, -13300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(2500, -13800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(2600, -14500),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								}
								])))
					]),
				env) : ((omodel.Y === 600) ? _Utils_Tuple3(
				nd,
				_List_fromArray(
					[
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_d, true))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_w, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_a, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_s, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$shift, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$capsLock, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitEnemyMsg(
							_List_fromArray(
								[
									{
									dt: _Utils_Tuple2(6000 + 200, -300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(6000 + 400, -600),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(1)
								},
									{
									dt: _Utils_Tuple2(6000 + 400, -800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(6000 + 400, -800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(6000 + 600, -1000),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(6000 + 800, -1300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(6000 + 1000, -1700),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(6000 + 1300, -2000),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(6000 + 1500, -2400),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(6000 + 1900, -12800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(6000 + 2300, -13300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								}
								])))
					]),
				env) : ((omodel.Y === 1200) ? _Utils_Tuple3(
				nd,
				_List_fromArray(
					[
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_d, true))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_w, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_a, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_s, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$shift, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$capsLock, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitEnemyMsg(
							_List_fromArray(
								[
									{
									dt: _Utils_Tuple2(12000 + 200, -300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(12000 + 400, -600),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(1)
								},
									{
									dt: _Utils_Tuple2(12000 + 400, -800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(12000 + 400, -800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(12000 + 600, -1000),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(12000 + 800, -1300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(12000 + 1000, -1700),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(12000 + 1300, -2000),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								},
									{
									dt: _Utils_Tuple2(12000 + 1500, -2400),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)
								},
									{
									dt: _Utils_Tuple2(12000 + 1900, -12800),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)
								},
									{
									dt: _Utils_Tuple2(12000 + 2300, -13300),
									d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
								}
								])))
					]),
				env) : ((omodel.Y >= 1599) ? _Utils_Tuple3(
				nd,
				_List_fromArray(
					[
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitStartMenuMsg),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_d, false))),
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$DestroyTileMap),
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$StopShakeCameraMsg)
					]),
				env) : _Utils_Tuple3(
				nd,
				_List_fromArray(
					[
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_d, true))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_w, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_a, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$key_s, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$shift, false))),
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$SetKeyMsg(
							_Utils_Tuple2($author$project$Lib$Tools$KeyCode$capsLock, false)))
					]),
				env))))));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommand = function (a) {
	return {$: 0, a: a};
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field = F2(
	function (name, value) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('field')),
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(name)),
					_Utils_Tuple2('value', value)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$globalAlpha = function (alpha) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field,
		'globalAlpha',
		$elm$json$Json$Encode$float(alpha));
};
var $linsyking$elm_canvas$Canvas$Settings$Advanced$alpha = function (a) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommand(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$globalAlpha(a));
};
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$Color = function (a) {
	return {$: 0, a: a};
};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$Fill = function (a) {
	return {$: 1, a: a};
};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingDrawOp = function (a) {
	return {$: 2, a: a};
};
var $linsyking$elm_canvas$Canvas$Settings$fill = function (color) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingDrawOp(
		$linsyking$elm_canvas$Canvas$Internal$Canvas$Fill(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$Color(color)));
};
var $author$project$Lib$Coordinate$Coordinates$lengthToReal = F2(
	function (gd, x) {
		var realWidth = gd.dc.dA;
		return realWidth * (x / $author$project$MainConfig$plWidth);
	});
var $author$project$Lib$Coordinate$Coordinates$posToReal = F2(
	function (gd, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var realWidth = gd.dc.dA;
		var realHeight = gd.dc.dx;
		return _Utils_Tuple2(realWidth * (x / $author$project$MainConfig$plWidth), realHeight * (y / $author$project$MainConfig$plHeight));
	});
var $linsyking$elm_canvas$Canvas$Internal$Canvas$Rect = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $linsyking$elm_canvas$Canvas$rect = F3(
	function (pos, width, height) {
		return A3($linsyking$elm_canvas$Canvas$Internal$Canvas$Rect, pos, width, height);
	});
var $author$project$Lib$Render$Shape$rect = F3(
	function (gd, pos, _v0) {
		var w = _v0.a;
		var h = _v0.b;
		return A3(
			$linsyking$elm_canvas$Canvas$rect,
			A2($author$project$Lib$Coordinate$Coordinates$posToReal, gd, pos),
			A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, w),
			A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, h));
	});
var $linsyking$elm_canvas$Canvas$Settings$Text$Center = 2;
var $linsyking$elm_canvas$Canvas$Settings$Text$Middle = 2;
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$textAlign = function (align) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field,
		'textAlign',
		$elm$json$Json$Encode$string(align));
};
var $linsyking$elm_canvas$Canvas$Settings$Text$textAlignToString = function (alignment) {
	switch (alignment) {
		case 0:
			return 'left';
		case 1:
			return 'right';
		case 2:
			return 'center';
		case 3:
			return 'start';
		default:
			return 'end';
	}
};
var $linsyking$elm_canvas$Canvas$Settings$Text$align = function (alignment) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommand(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$textAlign(
			$linsyking$elm_canvas$Canvas$Settings$Text$textAlignToString(alignment)));
};
var $linsyking$elm_canvas$Canvas$Settings$Text$textBaseLineToString = function (baseLineSetting) {
	switch (baseLineSetting) {
		case 0:
			return 'top';
		case 1:
			return 'hanging';
		case 2:
			return 'middle';
		case 3:
			return 'alphabetic';
		case 4:
			return 'ideographic';
		default:
			return 'bottom';
	}
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$textBaseline = function (baseline) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field,
		'textBaseline',
		$elm$json$Json$Encode$string(baseline));
};
var $linsyking$elm_canvas$Canvas$Settings$Text$baseLine = function (textBaseLine) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommand(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$textBaseline(
			$linsyking$elm_canvas$Canvas$Settings$Text$textBaseLineToString(textBaseLine)));
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$font = function (f) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field,
		'font',
		$elm$json$Json$Encode$string(f));
};
var $linsyking$elm_canvas$Canvas$Settings$Text$font = function (_v0) {
	var style = _v0.ai;
	var size = _v0.ag;
	var family = _v0.ae;
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommand(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$font(
			style + (' ' + ($elm$core$String$fromInt(size) + ('px ' + family)))));
};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableText = function (a) {
	return {$: 0, a: a};
};
var $linsyking$elm_canvas$Canvas$Internal$Canvas$FillAndStroke = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$Internal$Canvas$Stroke = function (a) {
	return {$: 2, a: a};
};
var $linsyking$elm_canvas$Canvas$mergeDrawOp = F2(
	function (op1, op2) {
		var _v0 = _Utils_Tuple2(op1, op2);
		_v0$7:
		while (true) {
			switch (_v0.b.$) {
				case 3:
					var _v1 = _v0.b;
					var c = _v1.a;
					var sc = _v1.b;
					return A2($linsyking$elm_canvas$Canvas$Internal$Canvas$FillAndStroke, c, sc);
				case 1:
					switch (_v0.a.$) {
						case 1:
							var c = _v0.b.a;
							return $linsyking$elm_canvas$Canvas$Internal$Canvas$Fill(c);
						case 2:
							var c1 = _v0.a.a;
							var c2 = _v0.b.a;
							return A2($linsyking$elm_canvas$Canvas$Internal$Canvas$FillAndStroke, c2, c1);
						case 3:
							var _v2 = _v0.a;
							var sc = _v2.b;
							var c2 = _v0.b.a;
							return A2($linsyking$elm_canvas$Canvas$Internal$Canvas$FillAndStroke, c2, sc);
						default:
							break _v0$7;
					}
				case 2:
					switch (_v0.a.$) {
						case 2:
							var c = _v0.b.a;
							return $linsyking$elm_canvas$Canvas$Internal$Canvas$Stroke(c);
						case 1:
							var c1 = _v0.a.a;
							var c2 = _v0.b.a;
							return A2($linsyking$elm_canvas$Canvas$Internal$Canvas$FillAndStroke, c1, c2);
						case 3:
							var _v3 = _v0.a;
							var c = _v3.a;
							var sc2 = _v0.b.a;
							return A2($linsyking$elm_canvas$Canvas$Internal$Canvas$FillAndStroke, c, sc2);
						default:
							break _v0$7;
					}
				default:
					if (!_v0.a.$) {
						break _v0$7;
					} else {
						var whatever = _v0.a;
						var _v5 = _v0.b;
						return whatever;
					}
			}
		}
		var _v4 = _v0.a;
		var whatever = _v0.b;
		return whatever;
	});
var $linsyking$elm_canvas$Canvas$addSettingsToRenderable = F2(
	function (settings, renderable) {
		var addSetting = F2(
			function (setting, _v1) {
				var r = _v1;
				switch (setting.$) {
					case 0:
						var cmd = setting.a;
						return _Utils_update(
							r,
							{
								l: A2($elm$core$List$cons, cmd, r.l)
							});
					case 1:
						var cmds = setting.a;
						return _Utils_update(
							r,
							{
								l: A3($elm$core$List$foldl, $elm$core$List$cons, r.l, cmds)
							});
					case 3:
						var f = setting.a;
						return _Utils_update(
							r,
							{
								r: f(r.r)
							});
					default:
						var op = setting.a;
						return _Utils_update(
							r,
							{
								q: A2($linsyking$elm_canvas$Canvas$mergeDrawOp, r.q, op)
							});
				}
			});
		return A3($elm$core$List$foldl, addSetting, renderable, settings);
	});
var $linsyking$elm_canvas$Canvas$text = F3(
	function (settings, point, str) {
		return A2(
			$linsyking$elm_canvas$Canvas$addSettingsToRenderable,
			settings,
			{
				l: _List_Nil,
				q: $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified,
				r: $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableText(
					{aB: $elm$core$Maybe$Nothing, bX: point, aJ: str})
			});
	});
var $author$project$Lib$Render$Text$renderTextWithColorCenterStyle = F7(
	function (gd, size, s, ft, col, style, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var rx = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, size);
		var _v1 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			gd,
			_Utils_Tuple2(x, y));
		var dsx = _v1.a;
		var dsy = _v1.b;
		return A3(
			$linsyking$elm_canvas$Canvas$text,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Text$font(
					{
						ae: ft,
						ag: $elm$core$Basics$floor(rx),
						ai: style
					}),
					$linsyking$elm_canvas$Canvas$Settings$Text$align(2),
					$linsyking$elm_canvas$Canvas$Settings$fill(col),
					$linsyking$elm_canvas$Canvas$Settings$Text$baseLine(2)
				]),
			_Utils_Tuple2(dsx, dsy),
			s);
	});
var $author$project$Lib$Render$Text$renderTextWithColorCenter = F6(
	function (gd, size, s, ft, col, pos) {
		return A7($author$project$Lib$Render$Text$renderTextWithColorCenterStyle, gd, size, s, ft, col, '', pos);
	});
var $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableShapes = function (a) {
	return {$: 1, a: a};
};
var $linsyking$elm_canvas$Canvas$shapes = F2(
	function (settings, ss) {
		return A2(
			$linsyking$elm_canvas$Canvas$addSettingsToRenderable,
			settings,
			{
				l: _List_Nil,
				q: $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified,
				r: $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableShapes(ss)
			});
	});
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$viewModel = F2(
	function (env, d) {
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 14) {
				var m = _v0.a;
				return m;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Base$nullModel;
			}
		}();
		return (omodel.Y >= 1500) ? _List_fromArray(
			[
				_Utils_Tuple2(
				A2(
					$linsyking$elm_canvas$Canvas$shapes,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$black),
							$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha((omodel.Y - 1500) / 100)
						]),
					_List_fromArray(
						[
							A3(
							$author$project$Lib$Render$Shape$rect,
							env.S,
							_Utils_Tuple2(0, 0),
							_Utils_Tuple2(1920, 1080))
						])),
				3)
			]) : ((omodel.Y <= 200) ? _List_fromArray(
			[
				_Utils_Tuple2(
				A2(
					$linsyking$elm_canvas$Canvas$shapes,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$black),
							$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha((200 - omodel.Y) / 200)
						]),
					_List_fromArray(
						[
							A3(
							$author$project$Lib$Render$Shape$rect,
							env.S,
							_Utils_Tuple2(0, 0),
							_Utils_Tuple2(1920, 1080))
						])),
				3)
			]) : (((omodel.Y >= 400) && (omodel.Y <= 700)) ? _List_fromArray(
			[
				_Utils_Tuple2(
				A6(
					$author$project$Lib$Render$Text$renderTextWithColorCenter,
					env.S,
					65,
					'Chaos are unleashed with the scientist\'s invention...',
					'disposabledroid_bbregular',
					$avh4$elm_color$Color$white,
					_Utils_Tuple2(960, 300)),
				3)
			]) : (((omodel.Y >= 700) && (omodel.Y <= 1000)) ? _List_fromArray(
			[
				_Utils_Tuple2(
				A6(
					$author$project$Lib$Render$Text$renderTextWithColorCenter,
					env.S,
					65,
					'Use your weapon to defeat enemies...',
					'disposabledroid_bbregular',
					$avh4$elm_color$Color$white,
					_Utils_Tuple2(960, 300)),
				3)
			]) : (((omodel.Y >= 1000) && (omodel.Y <= 1500)) ? _List_fromArray(
			[
				_Utils_Tuple2(
				A6(
					$author$project$Lib$Render$Text$renderTextWithColorCenter,
					env.S,
					50,
					'Can you save humanity without becoming the very forces you set out to defeat?',
					'disposabledroid_bbregular',
					$avh4$elm_color$Color$white,
					_Utils_Tuple2(960, 300)),
				3)
			]) : _List_Nil))));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$initModel, env, i),
			dr: 'StoryAnimation',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Model$viewModel
		};
	});
var $author$project$Scenes$Home$Config$initObjects = F2(
	function (env, _v0) {
		return _List_fromArray(
			[
				A2($author$project$SceneProtos$CoreEngine$GameComponents$StoryAnimation$Export$initGC, env, $author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCInitData)
			]);
	});
var $author$project$Scenes$Home$Export$game = F2(
	function (env, msg) {
		return {
			bS: A2($author$project$Scenes$Home$Config$initObjects, env, msg)
		};
	});
var $author$project$Lib$Scene$Base$CoreEngineInitData = function (a) {
	return {$: 1, a: a};
};
var $author$project$Lib$Scene$Base$NullSceneMsg = {$: 2};
var $author$project$Lib$Env$Env$addCommonData = F2(
	function (commonData, env) {
		return {bb: commonData, S: env.S, w: env.w, Y: env.Y};
	});
var $linsyking$messenger_core$Messenger$GeneralModel$GeneralModel = F5(
	function (name, data, update, updaterec, view) {
		return {cV: data, dr: name, d$: update, d0: updaterec, d2: view};
	});
var $author$project$SceneProtos$CoreEngine$LayerSettings$GameLayerData = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameLayer$Global$dataToLDT = function (data) {
	return $author$project$SceneProtos$CoreEngine$LayerSettings$GameLayerData(data);
};
var $author$project$SceneProtos$CoreEngine$GameLayer$Common$nullModel = {bS: _List_Nil};
var $author$project$SceneProtos$CoreEngine$GameLayer$Global$ldtToData = function (ldt) {
	if (!ldt.$) {
		var x = ldt.a;
		return x;
	} else {
		return $author$project$SceneProtos$CoreEngine$GameLayer$Common$nullModel;
	}
};
var $author$project$SceneProtos$CoreEngine$GameLayer$Global$getLayerT = function (layer) {
	var view = F2(
		function (env, ldt) {
			return A2(
				layer.d2,
				env,
				$author$project$SceneProtos$CoreEngine$GameLayer$Global$ldtToData(ldt));
		});
	var updaterec = F3(
		function (env, lm, ldt) {
			var _v1 = A3(
				layer.d0,
				env,
				lm,
				$author$project$SceneProtos$CoreEngine$GameLayer$Global$ldtToData(ldt));
			var rldt = _v1.a;
			var newmsg = _v1.b;
			var newenv = _v1.c;
			return _Utils_Tuple3(
				$author$project$SceneProtos$CoreEngine$GameLayer$Global$dataToLDT(rldt),
				newmsg,
				newenv);
		});
	var update = F2(
		function (env, ldt) {
			var _v0 = A2(
				layer.d$,
				env,
				$author$project$SceneProtos$CoreEngine$GameLayer$Global$ldtToData(ldt));
			var rldt = _v0.a;
			var newmsg = _v0.b;
			var newenv = _v0.c;
			return _Utils_Tuple3(
				$author$project$SceneProtos$CoreEngine$GameLayer$Global$dataToLDT(rldt),
				newmsg,
				newenv);
		});
	return A5(
		$linsyking$messenger_core$Messenger$GeneralModel$GeneralModel,
		layer.dr,
		$author$project$SceneProtos$CoreEngine$GameLayer$Global$dataToLDT(layer.cV),
		update,
		updaterec,
		view);
};
var $author$project$SceneProtos$CoreEngine$LayerBase$Other = {$: 1};
var $author$project$SceneProtos$CoreEngine$Camera$Base$Normal = {$: 0};
var $author$project$SceneProtos$CoreEngine$Camera$Config$cameraHeight = 1080;
var $author$project$SceneProtos$CoreEngine$Camera$Config$cameraWidth = 1920;
var $author$project$SceneProtos$CoreEngine$Camera$Base$nullCamera = {
	a2: $author$project$SceneProtos$CoreEngine$Camera$Base$Normal,
	bZ: _Utils_Tuple2(960, 540),
	ag: _Utils_Tuple2($author$project$SceneProtos$CoreEngine$Camera$Config$cameraWidth, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraHeight),
	cz: _Utils_Tuple2(0, 0)
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $author$project$SceneProtos$CoreEngine$LayerBase$drawLine = F2(
	function (_v0, _v1) {
		var stx = _v0.a;
		var sty = _v0.b;
		var enx = _v1.a;
		var eny = _v1.b;
		var _v2 = _Utils_Tuple2(stx, sty);
		var x = _v2.a;
		var y = _v2.b;
		var _v3 = _Utils_Tuple2(enx - stx, eny - sty);
		var dx = _v3.a;
		var dy = _v3.b;
		var _v4 = (_Utils_cmp(
			$elm$core$Basics$abs(dx),
			$elm$core$Basics$abs(dy)) > 0) ? _Utils_Tuple2(
			$elm$core$Basics$abs(dx),
			_Utils_Tuple2(0, 0.5)) : _Utils_Tuple2(
			$elm$core$Basics$abs(dy),
			_Utils_Tuple2(0.5, 0));
		var steps = _v4.a;
		var _v5 = _v4.b;
		var xdir = _v5.a;
		var ydir = _v5.b;
		var _v6 = _Utils_Tuple2(dx / steps, dy / steps);
		var xinc = _v6.a;
		var yinc = _v6.b;
		return A2(
			$elm$core$List$map,
			A2($elm$core$Tuple$mapBoth, $elm$core$Basics$floor, $elm$core$Basics$floor),
			A2(
				$elm$core$List$map,
				function (i) {
					return A3(
						$elm$core$Tuple$mapBoth,
						$elm$core$Basics$add((i * xinc) + xdir),
						$elm$core$Basics$add((i * yinc) + ydir),
						_Utils_Tuple2(x, y));
				},
				A2($elm$core$List$range, 0, steps)));
	});
var $tortus$elm_array_2d$Array2D$getRow = F2(
	function (row, array2d) {
		return A2($elm$core$Array$get, row, array2d.cV);
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $tortus$elm_array_2d$Array2D$set = F4(
	function (row, col, newValue, array2d) {
		return A2(
			$elm$core$Maybe$withDefault,
			array2d,
			A2(
				$elm$core$Maybe$map,
				function (rowAry) {
					return _Utils_update(
						array2d,
						{
							cV: A3(
								$elm$core$Array$set,
								row,
								A3($elm$core$Array$set, col, newValue, rowAry),
								array2d.cV)
						});
				},
				A2($tortus$elm_array_2d$Array2D$getRow, row, array2d)));
	});
var $author$project$SceneProtos$CoreEngine$LayerBase$createLine = F3(
	function (_v0, _v1, tileMap) {
		var stx = _v0.a;
		var sty = _v0.b;
		var enx = _v1.a;
		var eny = _v1.b;
		var line = A2(
			$author$project$SceneProtos$CoreEngine$LayerBase$drawLine,
			_Utils_Tuple2(stx, sty),
			_Utils_Tuple2(enx, eny));
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v2, arr) {
					var x = _v2.a;
					var y = _v2.b;
					return A4($tortus$elm_array_2d$Array2D$set, x, y, 1, arr);
				}),
			tileMap,
			line);
	});
var $tortus$elm_array_2d$Array2D$repeat = F3(
	function (numRows, numColumns, e) {
		var row = A2($elm$core$Array$repeat, numColumns, e);
		return {
			i: numColumns,
			cV: A2($elm$core$Array$repeat, numRows, row)
		};
	});
var $author$project$SceneProtos$CoreEngine$LayerBase$nullTileMap = A3($tortus$elm_array_2d$Array2D$repeat, 96, 96, 0);
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm_community$list_extra$List$Extra$andThen = $elm$core$List$concatMap;
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$drawBlock = F2(
	function (_v0, _v1) {
		var stx = _v0.a;
		var sty = _v0.b;
		var enx = _v1.a;
		var eny = _v1.b;
		var yList = A2($elm$core$List$range, sty, eny);
		var xList = A2($elm$core$List$range, stx, enx);
		return A2(
			$elm_community$list_extra$List$Extra$andThen,
			function (x) {
				return A2(
					$elm_community$list_extra$List$Extra$andThen,
					function (y) {
						return _List_fromArray(
							[
								_Utils_Tuple2(x, y)
							]);
					},
					yList);
			},
			xList);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$setBlock = F4(
	function (_v0, _v1, i, tileMap) {
		var stx = _v0.a;
		var sty = _v0.b;
		var enx = _v1.a;
		var eny = _v1.b;
		var block = A2(
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$drawBlock,
			_Utils_Tuple2(stx, sty),
			_Utils_Tuple2(enx, eny));
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v2, arr) {
					var x = _v2.a;
					var y = _v2.b;
					return A4($tortus$elm_array_2d$Array2D$set, x, y, i, arr);
				}),
			tileMap,
			block);
	});
var $author$project$SceneProtos$CoreEngine$LayerBase$testTileMap = A4(
	$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$setBlock,
	_Utils_Tuple2(20, 25),
	_Utils_Tuple2(200, 300),
	1,
	A3(
		$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
		_Utils_Tuple2(29, 3),
		_Utils_Tuple2(32, 3),
		A3(
			$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
			_Utils_Tuple2(34, 9),
			_Utils_Tuple2(38, 9),
			A3(
				$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
				_Utils_Tuple2(30, 13),
				_Utils_Tuple2(35, 17),
				A3(
					$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
					_Utils_Tuple2(23, 9),
					_Utils_Tuple2(23, 10),
					A3(
						$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
						_Utils_Tuple2(25, 5),
						_Utils_Tuple2(25, 9),
						A3(
							$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
							_Utils_Tuple2(6, 4),
							_Utils_Tuple2(7, 4),
							A3(
								$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
								_Utils_Tuple2(13, 2),
								_Utils_Tuple2(17, 6),
								A3(
									$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
									_Utils_Tuple2(10, 4),
									_Utils_Tuple2(10, 7),
									A3(
										$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
										_Utils_Tuple2(1, 5),
										_Utils_Tuple2(5, 5),
										A3(
											$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
											_Utils_Tuple2(16, 10),
											_Utils_Tuple2(24, 10),
											A3(
												$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
												_Utils_Tuple2(5, 14),
												_Utils_Tuple2(10, 14),
												A3(
													$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
													_Utils_Tuple2(1, 20),
													_Utils_Tuple2(250, 20),
													A3(
														$author$project$SceneProtos$CoreEngine$LayerBase$createLine,
														_Utils_Tuple2(0, 1),
														_Utils_Tuple2(0, 20),
														$author$project$SceneProtos$CoreEngine$LayerBase$nullTileMap))))))))))))));
var $author$project$SceneProtos$CoreEngine$LayerBase$nullCommonData = {cN: _List_Nil, b: $author$project$SceneProtos$CoreEngine$Camera$Base$nullCamera, cR: 200, bt: $author$project$SceneProtos$CoreEngine$LayerBase$Other, dF: false, dT: $author$project$SceneProtos$CoreEngine$LayerBase$testTileMap};
var $author$project$SceneProtos$CoreEngine$SceneInit$initCommonData = F2(
	function (env, _v0) {
		return $author$project$SceneProtos$CoreEngine$LayerBase$nullCommonData;
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$initModel = F2(
	function (_v0, coreInit) {
		return coreInit;
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCMsg = {$: 0};
var $author$project$Base$Paused = 1;
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$QuitMsg = {$: 20};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg = {$: 19};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyInit = F5(
	function (position, size, id, typeId, mass) {
		return {c8: id, bK: mass, bZ: position, ag: size, d_: typeId};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCBulletInitData = function (a) {
	return {$: 11, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipInitData = function (a) {
	return {$: 2, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnderInitData = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyInitData = function (a) {
	return {$: 10, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCGameMapInitData = function (a) {
	return {$: 13, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData = F2(
	function (a, b) {
		return {$: 15, a: a, b: b};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPauseMenuInitData = function (a) {
	return {$: 6, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerInitData = function (a) {
	return {$: 14, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCRulesInitData = function (a) {
	return {$: 4, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuInitData = function (a) {
	return {$: 5, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreInitData = function (a) {
	return {$: 9, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreMenuInitData = function (a) {
	return {$: 8, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuInitData = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponInitData = function (a) {
	return {$: 12, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GameMapInit = {};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$NoUpgrade = 3;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$PlayerInit = F2(
	function (pozition, size) {
		return {du: pozition, ag: size};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Base$RulesInit = {};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$Shooter = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$StarterMenuInit = {};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$WeaponInit = F4(
	function (position, size, atkInterval, atkType) {
		return {aR: atkInterval, aS: atkType, bZ: position, ag: size};
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$changeState = function (state) {
	if (state === 1) {
		return 0;
	} else {
		return 1;
	}
};
var $tortus$elm_array_2d$Array2D$empty = {i: 0, cV: $elm$core$Array$empty};
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID = function (xs) {
	return 1 + A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$List$maximum(
			A2(
				$elm$core$List$map,
				function (x) {
					return x.cV.cx;
				},
				xs)));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$Bullet = F3(
	function (bulletType, atk, delay) {
		return {aO: atk, a$: bulletType, be: delay};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCBulletModel = function (a) {
	return {$: 5, a: a};
};
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$calcVelocity = function (bullet) {
	var v = bullet.cz;
	var _v0 = bullet.dR;
	var tgx = _v0.a;
	var tgy = _v0.b;
	var _v1 = bullet.dL;
	var stx = _v1.a;
	var sty = _v1.b;
	var pathLen = $elm$core$Basics$sqrt(
		A2($elm$core$Basics$pow, stx - tgx, 2) + A2($elm$core$Basics$pow, sty - tgy, 2));
	var _v2 = _Utils_Tuple2((tgx - stx) / pathLen, (tgy - sty) / pathLen);
	var dirx = _v2.a;
	var diry = _v2.b;
	return _Utils_Tuple2(dirx * v, diry * v);
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox = {
	bT: _Utils_Tuple2(0, 0),
	ag: _Utils_Tuple2(0, 0)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 11)) {
			var id = initData.a;
			var bullet = initData.b.a;
			return {
				aM: _Utils_Tuple2(0, 0),
				bj: $elm$core$Dict$empty,
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCBulletModel(
					A3($author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$Bullet, bullet.a$, bullet.aO, bullet.be)),
				bm: _List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						bullet.ag)
					]),
				bo: 5,
				dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive,
				bK: 10,
				bZ: A3($elm$core$Tuple$mapBoth, $elm$core$Basics$round, $elm$core$Basics$round, bullet.dL),
				cl: $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox,
				ag: bullet.ag,
				cx: id,
				cz: $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$calcVelocity(bullet)
			};
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCSplashMsg = F2(
	function (a, b) {
		return {$: 16, a: a, b: b};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet = A3(
	$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$Bullet,
	$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet(0),
	0,
	0);
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$updateModel = F2(
	function (env, d) {
		var _v0 = env.w;
		if (!_v0.$) {
			var _v1 = d.dg;
			if (!_v1.$) {
				var omodel = function () {
					var _v2 = d.c5;
					if (_v2.$ === 5) {
						var model = _v2.a;
						return model;
					} else {
						return $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet;
					}
				}();
				var newBullet = (!omodel.be) ? _Utils_update(
					d,
					{
						bZ: _Utils_Tuple2(
							d.bZ.a + $elm$core$Basics$round(d.cz.a),
							d.bZ.b + $elm$core$Basics$round(d.cz.b))
					}) : _Utils_update(
					d,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCBulletModel(
							_Utils_update(
								omodel,
								{be: omodel.be - 1}))
					});
				return _Utils_Tuple3(newBullet, _List_Nil, env);
			} else {
				var dt = _v1.a;
				var omodel = function () {
					var _v3 = d.c5;
					if (_v3.$ === 5) {
						var model = _v3.a;
						return model;
					} else {
						return $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet;
					}
				}();
				return ((!dt) && _Utils_eq(
					omodel.a$,
					$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet(1))) ? _Utils_Tuple3(
					_Utils_update(
						d,
						{
							dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(1)
						}),
					_List_fromArray(
						[
							_Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
							A2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCSplashMsg, d.bZ, 155)),
							_Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCShakeCameraMsg(9))
						]),
					env) : _Utils_Tuple3(
					_Utils_update(
						d,
						{
							dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(dt + 1)
						}),
					_List_Nil,
					env);
			}
		} else {
			return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$updateModelRec = F3(
	function (env, msg, d) {
		if (!_Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)) {
			return _Utils_Tuple3(d, _List_Nil, env);
		} else {
			if (msg.$ === 5) {
				var str = msg.a;
				return (str !== 'Weapon') ? _Utils_Tuple3(
					_Utils_update(
						d,
						{
							dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
						}),
					_List_Nil,
					env) : _Utils_Tuple3(
					_Utils_update(
						d,
						{
							dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(-120),
							cz: _Utils_Tuple2((-1) * d.cz.a, (-1) * d.cz.b)
						}),
					_List_Nil,
					env);
			} else {
				return _Utils_Tuple3(d, _List_Nil, env);
			}
		}
	});
var $elm$core$Basics$atan2 = _Basics_atan2;
var $avh4$elm_color$Color$blue = A4($avh4$elm_color$Color$RgbaSpace, 52 / 255, 101 / 255, 164 / 255, 1.0);
var $linsyking$elm_canvas$Canvas$Internal$Canvas$Circle = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$circle = F2(
	function (pos, radius) {
		return A2($linsyking$elm_canvas$Canvas$Internal$Canvas$Circle, pos, radius);
	});
var $author$project$Lib$Render$Shape$circle = F3(
	function (gd, pos, r) {
		return A2(
			$linsyking$elm_canvas$Canvas$circle,
			A2($author$project$Lib$Coordinate$Coordinates$posToReal, gd, pos),
			A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, r));
	});
var $avh4$elm_color$Color$darkYellow = A4($avh4$elm_color$Color$RgbaSpace, 196 / 255, 160 / 255, 0 / 255, 1.0);
var $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableGroup = function (a) {
	return {$: 4, a: a};
};
var $linsyking$elm_canvas$Canvas$group = F2(
	function (settings, entities) {
		return A2(
			$linsyking$elm_canvas$Canvas$addSettingsToRenderable,
			settings,
			{
				l: _List_Nil,
				q: $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified,
				r: $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableGroup(entities)
			});
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$isDead = function (d) {
	var _v0 = d.dg;
	if (_v0.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$lengthInCam = F2(
	function (env, l) {
		var _v0 = env.bb.b.ag;
		var cw = _v0.a;
		return (1920 * l) / cw;
	});
var $avh4$elm_color$Color$orange = A4($avh4$elm_color$Color$RgbaSpace, 245 / 255, 121 / 255, 0 / 255, 1.0);
var $elm$random$Random$Generator = $elm$core$Basics$identity;
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _v0.a;
			var hi = _v0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
					$elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = $elm$random$Random$peel(seed);
						var seedN = $elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var $author$project$Lib$Tools$RNG$genInt = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	return A2($elm$random$Random$int, a, b);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $author$project$Lib$Tools$RNG$seed = function (t) {
	return $elm$random$Random$initialSeed(t);
};
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0;
		return generator(seed);
	});
var $author$project$Lib$Tools$RNG$genRandomInt = F2(
	function (t, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$step,
			$author$project$Lib$Tools$RNG$genInt(
				_Utils_Tuple2(a, b)),
			$author$project$Lib$Tools$RNG$seed(t)).a;
	});
var $author$project$SceneProtos$CoreEngine$Camera$Camera$isShaking = function (env) {
	var _v0 = env.bb.b.a2;
	if (_v0.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$SceneProtos$CoreEngine$Camera$Camera$shakePos = F2(
	function (env, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		if ((!A2($elm$core$Basics$modBy, 3, env.Y)) && $author$project$SceneProtos$CoreEngine$Camera$Camera$isShaking(env)) {
			var offsetY = A2(
				$author$project$Lib$Tools$RNG$genRandomInt,
				env.Y,
				_Utils_Tuple2(-18, 18));
			var offsetX = A2(
				$author$project$Lib$Tools$RNG$genRandomInt,
				env.Y,
				_Utils_Tuple2(-20, 20));
			return _Utils_Tuple2(x + offsetX, y + offsetY);
		} else {
			return _Utils_Tuple2(x, y);
		}
	});
var $author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam = F2(
	function (env, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var _v1 = env.bb.b.bZ;
		var cx = _v1.a;
		var cy = _v1.b;
		var _v2 = env.bb.b.ag;
		var cw = _v2.a;
		var ch = _v2.b;
		return A2(
			$author$project$SceneProtos$CoreEngine$Camera$Camera$shakePos,
			env,
			_Utils_Tuple2((1920 / cw) * ((x - cx) + (cw / 2)), (1080 / ch) * ((y - cy) + (ch / 2))));
	});
var $avh4$elm_color$Color$red = A4($avh4$elm_color$Color$RgbaSpace, 204 / 255, 0 / 255, 0 / 255, 1.0);
var $author$project$Lib$Resources$Base$igetSprite = F2(
	function (name, dst) {
		return A2($elm$core$Dict$get, name, dst);
	});
var $linsyking$elm_canvas$Canvas$Texture$dimensions = function (texture) {
	if (!texture.$) {
		var image = texture.a;
		return {bl: image.bl, cC: image.cC};
	} else {
		var data = texture.a;
		return {bl: data.bl, cC: data.cC};
	}
};
var $linsyking$elm_canvas$Canvas$Settings$Advanced$Scale = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$Settings$Advanced$scale = $linsyking$elm_canvas$Canvas$Settings$Advanced$Scale;
var $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableTexture = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$texture = F3(
	function (settings, p, t) {
		return A2(
			$linsyking$elm_canvas$Canvas$addSettingsToRenderable,
			settings,
			{
				l: _List_Nil,
				q: $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified,
				r: A2($linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableTexture, p, t)
			});
	});
var $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommands = function (a) {
	return {$: 1, a: a};
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn = F2(
	function (name, args) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('function')),
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string(name)),
					_Utils_Tuple2(
					'args',
					A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, args))
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$rotate = function (angle) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
		'rotate',
		_List_fromArray(
			[
				$elm$json$Json$Encode$float(angle)
			]));
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$scale = F2(
	function (x, y) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'scale',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$transform = F6(
	function (a, b, c, d, e, f) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'transform',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(a),
					$elm$json$Json$Encode$float(b),
					$elm$json$Json$Encode$float(c),
					$elm$json$Json$Encode$float(d),
					$elm$json$Json$Encode$float(e),
					$elm$json$Json$Encode$float(f)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$translate = F2(
	function (x, y) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'translate',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y)
				]));
	});
var $linsyking$elm_canvas$Canvas$Settings$Advanced$transform = function (transforms) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommands(
		A2(
			$elm$core$List$map,
			function (t) {
				switch (t.$) {
					case 0:
						var angle = t.a;
						return $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$rotate(angle);
					case 1:
						var x = t.a;
						var y = t.b;
						return A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$scale, x, y);
					case 2:
						var x = t.a;
						var y = t.b;
						return A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$translate, x, y);
					default:
						var m11 = t.a.dj;
						var m12 = t.a.dk;
						var m21 = t.a.dl;
						var m22 = t.a.dm;
						var dx = t.a.cX;
						var dy = t.a.cY;
						return A6($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$transform, m11, m12, m21, m22, dx, dy);
				}
			},
			transforms));
};
var $linsyking$elm_canvas$Canvas$Settings$Advanced$Translate = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$Settings$Advanced$translate = $linsyking$elm_canvas$Canvas$Settings$Advanced$Translate;
var $author$project$Lib$Render$Sprite$renderSprite_ = F5(
	function (gd, ls, p, _v0, t) {
		var w = _v0.a;
		var h = _v0.b;
		var text_dim = $linsyking$elm_canvas$Canvas$Texture$dimensions(t);
		var text_height = text_dim.bl;
		var text_width = text_dim.cC;
		var rw = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, w);
		var width_s = rw / text_width;
		var rh = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, h);
		var height_s = rh / text_height;
		var _v1 = A2($author$project$Lib$Coordinate$Coordinates$posToReal, gd, p);
		var newx = _v1.a;
		var newy = _v1.b;
		return ((w > 0) && (h > 0)) ? A3(
			$linsyking$elm_canvas$Canvas$texture,
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
					_List_fromArray(
						[
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, newx, newy),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$scale, width_s, height_s)
						])),
				ls),
			_Utils_Tuple2(0, 0),
			t) : (((w > 0) && (h <= 0)) ? A3(
			$linsyking$elm_canvas$Canvas$texture,
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
					_List_fromArray(
						[
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, newx, newy),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$scale, width_s, width_s)
						])),
				ls),
			_Utils_Tuple2(0, 0),
			t) : (((w <= 0) && (h > 0)) ? A3(
			$linsyking$elm_canvas$Canvas$texture,
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
					_List_fromArray(
						[
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, newx, newy),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$scale, height_s, height_s)
						])),
				ls),
			_Utils_Tuple2(0, 0),
			t) : A3(
			$linsyking$elm_canvas$Canvas$texture,
			ls,
			_Utils_Tuple2(newx, newy),
			t)));
	});
var $author$project$Lib$Render$Sprite$renderSprite = F5(
	function (gd, ls, p, size, name) {
		var dst = gd.dc.dH;
		var _v0 = A2($author$project$Lib$Resources$Base$igetSprite, name, dst);
		if (!_v0.$) {
			var t = _v0.a;
			return A5($author$project$Lib$Render$Sprite$renderSprite_, gd, ls, p, size, t);
		} else {
			return $linsyking$elm_canvas$Canvas$empty;
		}
	});
var $linsyking$elm_canvas$Canvas$Settings$Advanced$Rotate = function (a) {
	return {$: 0, a: a};
};
var $linsyking$elm_canvas$Canvas$Settings$Advanced$rotate = $linsyking$elm_canvas$Canvas$Settings$Advanced$Rotate;
var $author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam = F2(
	function (env, _v0) {
		var w = _v0.a;
		var h = _v0.b;
		var _v1 = env.bb.b.ag;
		var cw = _v1.a;
		var ch = _v1.b;
		return _Utils_Tuple2((1920 * w) / cw, (1080 * h) / ch);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$viewModel = F2(
	function (env, data) {
		var omodel = function () {
			var _v11 = data.c5;
			if (_v11.$ === 5) {
				var bullet = _v11.a;
				return bullet;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet;
			}
		}();
		var id = function () {
			var _v10 = omodel.a$;
			if (!_v10.$) {
				return 'bullet_player';
			} else {
				var eb = _v10.a;
				return 'bullet_enemy' + $elm$core$String$fromInt(eb);
			}
		}();
		var gd = env.S;
		var color = function () {
			var _v8 = omodel.a$;
			if (!_v8.$) {
				return $avh4$elm_color$Color$darkYellow;
			} else {
				var eb = _v8.a;
				switch (eb) {
					case 0:
						return $avh4$elm_color$Color$red;
					case 1:
						return $avh4$elm_color$Color$blue;
					default:
						return $avh4$elm_color$Color$black;
				}
			}
		}();
		var angle = A2($elm$core$Basics$atan2, data.cz.b, data.cz.a);
		var _v0 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam, env, data.ag);
		var sizex = _v0.a;
		var sizey = _v0.b;
		var _v1 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			gd,
			_Utils_Tuple2(sizex, sizey));
		var rsizex = _v1.a;
		var rsizey = _v1.b;
		var _v2 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, data.bZ);
		var posx = _v2.a;
		var posy = _v2.b;
		var _v3 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			gd,
			_Utils_Tuple2(posx, posy));
		var rposx = _v3.a;
		var rposy = _v3.b;
		var _v4 = _Utils_Tuple2(posx + (sizex / 2), posy + (sizey / 2));
		var rx = _v4.a;
		var ry = _v4.b;
		var _v5 = _Utils_Tuple2(posx - (sizex / 2), posy - (sizey / 2));
		var lx = _v5.a;
		var ly = _v5.b;
		var _v6 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			gd,
			_Utils_Tuple2(lx, ly));
		var rlx = _v6.a;
		var rly = _v6.b;
		if (omodel.be > 0) {
			return _List_Nil;
		} else {
			if (_Utils_eq(
				omodel.a$,
				$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet(1)) && $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$isDead(data)) {
				var dead = function () {
					var _v7 = data.dg;
					if (_v7.$ === 1) {
						var i = _v7.a;
						return i;
					} else {
						return -1;
					}
				}();
				return ((dead >= 1) && (dead <= 5)) ? _List_fromArray(
					[
						_Utils_Tuple2(
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$white)
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Lib$Render$Shape$circle,
									gd,
									_Utils_Tuple2(lx, ly),
									A2($author$project$SceneProtos$CoreEngine$Camera$Camera$lengthInCam, env, 150))
								])),
						1)
					]) : ((dead <= 8) ? _List_fromArray(
					[
						_Utils_Tuple2(
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$orange)
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Lib$Render$Shape$circle,
									gd,
									_Utils_Tuple2(lx, ly),
									A2($author$project$SceneProtos$CoreEngine$Camera$Camera$lengthInCam, env, 150))
								])),
						1)
					]) : ((dead <= 9) ? _List_fromArray(
					[
						_Utils_Tuple2(
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$red)
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Lib$Render$Shape$circle,
									gd,
									_Utils_Tuple2(lx, ly),
									A2($author$project$SceneProtos$CoreEngine$Camera$Camera$lengthInCam, env, 150))
								])),
						1)
					]) : _List_Nil));
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						A2(
							$linsyking$elm_canvas$Canvas$group,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
									_List_fromArray(
										[
											A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, rposx, rposy),
											$linsyking$elm_canvas$Canvas$Settings$Advanced$rotate(angle),
											A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, -rposx, -rposy)
										]))
								]),
							_List_fromArray(
								[
									A5(
									$author$project$Lib$Render$Sprite$renderSprite,
									gd,
									_List_Nil,
									_Utils_Tuple2(lx, ly),
									_Utils_Tuple2(sizex, sizey),
									id)
								])),
						0)
					]);
			}
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$initModel, env, i),
			dr: 'Bullet',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data = function (uid) {
	return function (size) {
		return function (position) {
			return function (velocity) {
				return function (acceleration) {
					return function (mass) {
						return function (hitbox) {
							return function (simpleCheck) {
								return function (hp) {
									return function (lifeStatus) {
										return function (gcModel) {
											return function (extra) {
												return {aM: acceleration, bj: extra, c5: gcModel, bm: hitbox, bo: hp, dg: lifeStatus, bK: mass, bZ: position, cl: simpleCheck, ag: size, cx: uid, cz: velocity};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipModel = function (a) {
	return {$: 4, a: a};
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$calRandomV = F2(
	function (seed, div) {
		var v = A2(
			$author$project$Lib$Tools$RNG$genRandomInt,
			seed * 2,
			_Utils_Tuple2(12, 25)) / div;
		var theta = $elm$core$Basics$degrees(
			A2(
				$author$project$Lib$Tools$RNG$genRandomInt,
				seed,
				_Utils_Tuple2(270 - 45, 270 + 45)));
		return _Utils_Tuple2(
			v * $elm$core$Basics$cos(theta),
			v * $elm$core$Basics$sin(theta));
	});
var $author$project$MainConfig$gravity = 1.1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Coin = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel = {
	dR: _Utils_Tuple2(0, 0),
	aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Coin(0)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$initModel = F2(
	function (env, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 2)) {
			var id = initData.a;
			var chipI = initData.b.a;
			var mass = 1;
			var _v1 = chipI.aK;
			if (_v1.$ === 1) {
				return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
					_Utils_Tuple2(25, 25))(chipI.bZ)(
					A2($author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$calRandomV, (env.Y + 1926) - id, 1))(
					_Utils_Tuple2(0, $author$project$MainConfig$gravity))(mass)(
					_List_fromArray(
						[$author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox]))(
					A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(30, 30)))(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipModel(
						_Utils_update(
							$author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel,
							{aK: chipI.aK})))($author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$initExtraData);
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
					_Utils_Tuple2(50, 50))(chipI.bZ)(
					A2($author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$calRandomV, (env.Y + 1926) - id, 1.8))(
					_Utils_Tuple2(0, $author$project$MainConfig$gravity))(mass)(
					_List_fromArray(
						[$author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox]))(
					A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(60, 60)))(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipModel(
						_Utils_update(
							$author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel,
							{aK: chipI.aK})))($author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$initExtraData);
			}
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $tortus$elm_array_2d$Array2D$rows = function (array2d) {
	return $elm$core$Array$length(array2d.cV);
};
var $author$project$Lib$Tools$ArrayTools$array2D_flatten = function (arr) {
	return $elm$core$List$concat(
		A2(
			$elm$core$List$map,
			function (i) {
				return $elm$core$Array$toList(
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Array$empty,
						A2($tortus$elm_array_2d$Array2D$getRow, i, arr)));
			},
			A2(
				$elm$core$List$range,
				0,
				$tortus$elm_array_2d$Array2D$rows(arr) - 1)));
};
var $tortus$elm_array_2d$Array2D$columns = function (array2d) {
	return array2d.i;
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $tortus$elm_array_2d$Array2D$get = F3(
	function (row, col, array2d) {
		return A2(
			$elm$core$Maybe$andThen,
			$elm$core$Array$get(col),
			A2($tortus$elm_array_2d$Array2D$getRow, row, array2d));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			e: _List_Nil,
			c: 0,
			d: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.c * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						e: A2($elm$core$List$cons, mappedLeaf, builder.e),
						c: builder.c + 1,
						d: builder.d
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $tortus$elm_array_2d$Array2D$indexedMap = F2(
	function (func, array2d) {
		var mappedData = A2(
			$elm$core$Array$indexedMap,
			F2(
				function (row, rowAry) {
					return A2(
						$elm$core$Array$indexedMap,
						F2(
							function (col, value) {
								return A3(func, row, col, value);
							}),
						rowAry);
				}),
			array2d.cV);
		return {i: array2d.i, cV: mappedData};
	});
var $elm$core$Array$isEmpty = function (_v0) {
	var len = _v0.a;
	return !len;
};
var $tortus$elm_array_2d$Array2D$isEmpty = function (array2d) {
	return $elm$core$Array$isEmpty(array2d.cV);
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Lib$Tools$ArrayTools$array2D_indexedSlice = F3(
	function (_v0, _v1, array) {
		var x1_ = _v0.a;
		var y1_ = _v0.b;
		var x2_ = _v1.a;
		var y2_ = _v1.b;
		if ($tortus$elm_array_2d$Array2D$isEmpty(array)) {
			return A2(
				$tortus$elm_array_2d$Array2D$indexedMap,
				F3(
					function (i, j, c) {
						return _Utils_Tuple2(
							_Utils_Tuple2(i, j),
							c);
					}),
				array);
		} else {
			var _v2 = A3($tortus$elm_array_2d$Array2D$get, 0, 0, array);
			if (_v2.$ === 1) {
				return A2(
					$tortus$elm_array_2d$Array2D$indexedMap,
					F3(
						function (i, j, c) {
							return _Utils_Tuple2(
								_Utils_Tuple2(i, j),
								c);
						}),
					array);
			} else {
				var defaultEle = _v2.a;
				var y1 = A2($elm$core$Basics$max, 0, y1_);
				var x1 = A2($elm$core$Basics$max, 0, x1_);
				var f = F2(
					function (x, y) {
						return A2(
							$elm$core$Maybe$withDefault,
							defaultEle,
							A3($tortus$elm_array_2d$Array2D$get, x + x1, y + y1, array));
					});
				var _v3 = _Utils_Tuple2(
					$tortus$elm_array_2d$Array2D$rows(array),
					$tortus$elm_array_2d$Array2D$columns(array));
				var r = _v3.a;
				var c = _v3.b;
				var y2 = A2($elm$core$Basics$min, c - 1, y2_);
				var h = (y2 - y1) + 1;
				var x2 = A2($elm$core$Basics$min, r - 1, x2_);
				var w = (x2 - x1) + 1;
				var slice = A3($tortus$elm_array_2d$Array2D$repeat, w, h, defaultEle);
				return A2(
					$tortus$elm_array_2d$Array2D$indexedMap,
					F3(
						function (i, j, _v4) {
							return _Utils_Tuple2(
								_Utils_Tuple2(i + x1, j + y1),
								A2(f, i, j));
						}),
					slice);
			}
		}
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$MainConfig$tileSize = 64;
var $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideX = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	var tm = env.bb.dT;
	var hb = d.cl;
	var _v1 = d.bZ;
	var x = _v1.a;
	var y = _v1.b;
	var _v2 = d.cz;
	var vx = _v2.a;
	var _v3 = _Utils_Tuple2((x + vx) + hb.bT.a, y + hb.bT.b);
	var x_ = _v3.a;
	var y_ = _v3.b;
	var _v4 = hb.ag;
	var w_ = _v4.a;
	var h_ = _v4.b;
	var br = _Utils_Tuple2(
		($elm$core$Basics$floor(x_ + (w_ / 2)) / $author$project$MainConfig$tileSize) | 0,
		($elm$core$Basics$floor(y_ + (h_ / 2)) / $author$project$MainConfig$tileSize) | 0);
	var realbr = _Utils_Tuple2(x_ + (w_ / 2), y_ + (h_ / 2));
	var realtl = _Utils_Tuple2(x_ - (w_ / 2), y_ - (h_ / 2));
	var tl = _Utils_Tuple2(
		($elm$core$Basics$ceiling(x_ - (w_ / 2)) / $author$project$MainConfig$tileSize) | 0,
		($elm$core$Basics$ceiling((y_ - (h_ / 2)) + 1) / $author$project$MainConfig$tileSize) | 0);
	var slice = $author$project$Lib$Tools$ArrayTools$array2D_flatten(
		A3($author$project$Lib$Tools$ArrayTools$array2D_indexedSlice, tl, br, tm));
	var _v5 = function () {
		if (vx > 0) {
			var minDx = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$minimum(
					A2(
						$elm$core$List$map,
						function (_v6) {
							var _v7 = _v6.a;
							var indexx = _v7.a;
							var grid = _v6.b;
							return (A2($elm$core$Basics$modBy, 2, grid) === 1) ? (((indexx * $author$project$MainConfig$tileSize) - $elm$core$Basics$floor(realbr.a)) - 1) : 0;
						},
						slice)));
			var nvelx = (!minDx) ? vx : 0;
			return _Utils_Tuple2(minDx, nvelx);
		} else {
			if (vx < 0) {
				var maxDx = A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$List$maximum(
						A2(
							$elm$core$List$map,
							function (_v8) {
								var _v9 = _v8.a;
								var indexx = _v9.a;
								var grid = _v8.b;
								return (A2($elm$core$Basics$modBy, 2, grid) === 1) ? ((((indexx + 1) * $author$project$MainConfig$tileSize) - $elm$core$Basics$ceiling(realtl.a)) + 1) : 0;
							},
							slice)));
				var nvelx = (!maxDx) ? vx : 0;
				return _Utils_Tuple2(maxDx, nvelx);
			} else {
				return _Utils_Tuple2(0, vx);
			}
		}
	}();
	var offsetX = _v5.a;
	var nvx = _v5.b;
	return _Utils_Tuple2(offsetX, nvx);
};
var $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideY = F2(
	function (_v0, dx) {
		var env = _v0.a;
		var d = _v0.b;
		var tm = env.bb.dT;
		var hb = d.cl;
		var _v1 = d.bZ;
		var x = _v1.a;
		var y = _v1.b;
		var _v2 = d.cz;
		var vx = _v2.a;
		var vy = _v2.b;
		var _v3 = _Utils_Tuple2(((x + vx) + dx) + hb.bT.a, (y + vy) + hb.bT.b);
		var x_ = _v3.a;
		var y_ = _v3.b;
		var _v4 = hb.ag;
		var w_ = _v4.a;
		var h_ = _v4.b;
		var br = _Utils_Tuple2(
			($elm$core$Basics$floor(x_ + (w_ / 2)) / $author$project$MainConfig$tileSize) | 0,
			($elm$core$Basics$floor(y_ + (h_ / 2)) / $author$project$MainConfig$tileSize) | 0);
		var realbr = _Utils_Tuple2(x_ + (w_ / 2), y_ + (h_ / 2));
		var realtl = _Utils_Tuple2(x_ - (w_ / 2), y_ - (h_ / 2));
		var tl = _Utils_Tuple2(
			($elm$core$Basics$ceiling(x_ - (w_ / 2)) / $author$project$MainConfig$tileSize) | 0,
			($elm$core$Basics$ceiling(y_ - (h_ / 2)) / $author$project$MainConfig$tileSize) | 0);
		var slice = $author$project$Lib$Tools$ArrayTools$array2D_flatten(
			A3($author$project$Lib$Tools$ArrayTools$array2D_indexedSlice, tl, br, tm));
		var _v5 = function () {
			if (vy > 0) {
				var minDy = A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$List$minimum(
						A2(
							$elm$core$List$map,
							function (_v6) {
								var _v7 = _v6.a;
								var indexy = _v7.b;
								var grid = _v6.b;
								return (A2($elm$core$Basics$modBy, 2, grid) === 1) ? (((indexy * $author$project$MainConfig$tileSize) - $elm$core$Basics$floor(realbr.b)) - 1) : 0;
							},
							slice)));
				var nvely = (!minDy) ? vy : 0;
				return _Utils_Tuple2(minDy, nvely);
			} else {
				if (vy < 0) {
					var maxDy = A2(
						$elm$core$Maybe$withDefault,
						0,
						$elm$core$List$maximum(
							A2(
								$elm$core$List$map,
								function (_v8) {
									var _v9 = _v8.a;
									var indexy = _v9.b;
									var grid = _v8.b;
									return (A2($elm$core$Basics$modBy, 2, grid) === 1) ? ((((indexy + 1) * $author$project$MainConfig$tileSize) - $elm$core$Basics$ceiling(realtl.b)) + 3) : 0;
								},
								slice)));
					var nvely = (!maxDy) ? vy : 0;
					return _Utils_Tuple2(maxDy, nvely);
				} else {
					return _Utils_Tuple2(0, vy);
				}
			}
		}();
		var offsetY = _v5.a;
		var nvy = _v5.b;
		return _Utils_Tuple2(offsetY, nvy);
	});
var $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideXY = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	var _v1 = d.bZ;
	var ox = _v1.a;
	var oy = _v1.b;
	var _v2 = d.cz;
	var ovx = _v2.a;
	var ovy = _v2.b;
	var _v3 = $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideX(
		_Utils_Tuple2(env, d));
	var offsetX = _v3.a;
	var nvx = _v3.b;
	var _v4 = A2(
		$author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideY,
		_Utils_Tuple2(env, d),
		offsetX);
	var offsetY = _v4.a;
	var nvy = _v4.b;
	var nvel = _Utils_Tuple2(nvx, nvy);
	var npos = _Utils_Tuple2(
		(ox + $elm$core$Basics$floor(ovx)) + offsetX,
		(oy + $elm$core$Basics$floor(ovy)) + offsetY);
	return _Utils_Tuple2(
		env,
		_Utils_update(
			d,
			{bZ: npos, cz: nvel}));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateDeadVel = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var ov = $elm$core$Basics$sqrt((d.cz.a * d.cz.a) + (d.cz.b * d.cz.b));
	var omodel = function () {
		var _v2 = d.c5;
		if (_v2.$ === 4) {
			var model = _v2.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel;
		}
	}();
	var tarp = omodel.dR;
	var nv = (ov < 12) ? (ov + 1) : ov;
	var curp = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, d.bZ);
	var vecL = $elm$core$Basics$sqrt(((tarp.a - curp.a) * (tarp.a - curp.a)) + ((tarp.b - curp.b) * (tarp.b - curp.b)));
	var nvel = _Utils_Tuple2(((tarp.a - curp.a) / vecL) * nv, ((tarp.b - curp.b) / vecL) * nv);
	var _v1 = _Utils_Tuple2(
		env,
		_Utils_update(
			d,
			{
				bZ: _Utils_Tuple2(
					d.bZ.a + $elm$core$Basics$round(nvel.a),
					d.bZ.b + $elm$core$Basics$round(nvel.b)),
				cz: nvel
			}));
	var newenv = _v1.a;
	var newdata = _v1.b;
	return _Utils_Tuple3(newdata, ls, newenv);
};
var $author$project$SceneProtos$CoreEngine$Physics$Movement$updateVelByAcc = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	return _Utils_Tuple2(
		env,
		_Utils_update(
			d,
			{
				cz: _Utils_Tuple2(d.cz.a + d.aM.a, d.cz.b + d.aM.b)
			}));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateVel = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var tileMap = env.bb.dT;
	var ovel = d.cz;
	var omodel = function () {
		var _v4 = d.c5;
		if (_v4.$ === 4) {
			var model = _v4.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel;
		}
	}();
	var _v1 = _Utils_Tuple2((d.bZ.a / $author$project$MainConfig$tileSize) | 0, ((d.bZ.b / $author$project$MainConfig$tileSize) | 0) + 1);
	var nposx = _v1.a;
	var nposy = _v1.b;
	var isOnGround = function (t) {
		return A2($elm$core$Basics$modBy, 2, t) === 1;
	}(
		A2(
			$elm$core$Maybe$withDefault,
			1,
			A3($tortus$elm_array_2d$Array2D$get, nposx, nposy, tileMap))) && ((_Utils_cmp(-0.02, ovel.b) < 0) && (ovel.b < 1));
	var nvel = isOnGround ? _Utils_Tuple2(0, 0) : ovel;
	var _v2 = $author$project$SceneProtos$CoreEngine$Physics$Movement$updateVelByAcc(
		_Utils_Tuple2(
			env,
			_Utils_update(
				d,
				{cz: nvel})));
	var newenv = _v2.a;
	var newdata = _v2.b;
	var _v3 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, d.bZ);
	var eposx = _v3.a;
	var eposy = _v3.b;
	return _Utils_Tuple3(newdata, ls, newenv);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateModel = F2(
	function (env, d) {
		var _v0 = env.w;
		if (!_v0.$) {
			if (_Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)) {
				var _v1 = $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateVel(
					_Utils_Tuple3(d, _List_Nil, env));
				var nd = _v1.a;
				var nl = _v1.b;
				var nenv = _v1.c;
				var _v2 = $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideXY(
					_Utils_Tuple2(nenv, nd));
				var nenv2 = _v2.a;
				var nd2 = _v2.b;
				return _Utils_Tuple3(nd2, nl, nenv2);
			} else {
				var _v3 = $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateDeadVel(
					_Utils_Tuple3(d, _List_Nil, env));
				var nd = _v3.a;
				var nl = _v3.b;
				var nenv = _v3.c;
				return _Utils_Tuple3(nd, nl, nenv);
			}
		} else {
			return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$globalImageSmoothingEnabled = function (enabled) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field,
		'imageSmoothingEnabled',
		$elm$json$Json$Encode$bool(enabled));
};
var $linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing = function (enabled) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingCommand(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$globalImageSmoothingEnabled(enabled));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$displayChip = F2(
	function (env, d) {
		var omodel = function () {
			var _v10 = d.c5;
			if (_v10.$ === 4) {
				var model = _v10.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel;
			}
		}();
		var id = function () {
			var _v3 = omodel.aK;
			if (!_v3.$) {
				switch (_v3.a) {
					case 0:
						var _v4 = _v3.a;
						return 'chip_doubletrigger';
					case 1:
						var _v5 = _v3.a;
						return 'chip_scatter';
					case 2:
						var _v6 = _v3.a;
						return 'chip_splash';
					default:
						var _v7 = _v3.a;
						return 'chip_empty';
				}
			} else {
				var n = _v3.a;
				if (n >= 5) {
					var _v8 = A2($elm$core$Basics$modBy, 5, (env.Y / 3) | 0);
					switch (_v8) {
						case 0:
							return 'coin_gold_1';
						case 1:
							return 'coin_gold_2';
						case 2:
							return 'coin_gold_3';
						case 3:
							return 'coin_gold_4';
						default:
							return 'coin_gold_5';
					}
				} else {
					var _v9 = A2($elm$core$Basics$modBy, 5, (env.Y / 3) | 0);
					switch (_v9) {
						case 0:
							return 'coin_silver_1';
						case 1:
							return 'coin_silver_2';
						case 2:
							return 'coin_silver_3';
						case 3:
							return 'coin_silver_4';
						default:
							return 'coin_silver_5';
					}
				}
			}
		}();
		var alphaVal = function () {
			var _v2 = d.dg;
			if (!_v2.$) {
				return 1.0;
			} else {
				var dt = _v2.a;
				return A2($elm$core$Basics$max, 0, 1.0 - (dt / 5));
			}
		}();
		var _v0 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var x_ = _v0.a;
		var y_ = _v0.b;
		var _v1 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam, env, d.ag);
		var w = _v1.a;
		var h = _v1.b;
		var y = y_ - (h / 2);
		var x = x_ - (w / 2);
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false),
					$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha(alphaVal)
				]),
			A2(
				$elm$core$List$cons,
				A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					_Utils_Tuple2(x, y),
					_Utils_Tuple2(w, h),
					id),
				_List_Nil));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$displayChip, env, d),
				1)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$initModel, env, i),
			dr: 'Chip',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnderModel = function (a) {
	return {$: 15, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$initModel = F2(
	function (env, initData) {
		if ((initData.$ === 15) && (!initData.b.$)) {
			var p = initData.b.a;
			return _Utils_update(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnderModel(
						{dI: env.Y, aK: p.aK})
				});
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$updateModel = F2(
	function (env, d) {
		var tt = function () {
			var _v0 = d.c5;
			if (_v0.$ === 15) {
				var mo = _v0.a;
				return mo.dI;
			} else {
				return 0;
			}
		}();
		return (_Utils_cmp(env.Y, tt + 1500) < 0) ? _Utils_Tuple3(d, _List_Nil, env) : _Utils_Tuple3(
			d,
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$QuitMsg)
				]),
			env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $linsyking$elm_canvas$Canvas$Settings$Text$Start = 3;
var $linsyking$elm_canvas$Canvas$Settings$Text$Top = 0;
var $author$project$Lib$Render$Text$renderTextWithColorStyle = F7(
	function (gd, size, s, ft, col, style, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var rx = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, size);
		var _v1 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			gd,
			_Utils_Tuple2(x, y));
		var dsx = _v1.a;
		var dsy = _v1.b;
		return A3(
			$linsyking$elm_canvas$Canvas$text,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Text$font(
					{
						ae: ft,
						ag: $elm$core$Basics$floor(rx),
						ai: style
					}),
					$linsyking$elm_canvas$Canvas$Settings$Text$align(3),
					$linsyking$elm_canvas$Canvas$Settings$fill(col),
					$linsyking$elm_canvas$Canvas$Settings$Text$baseLine(0)
				]),
			_Utils_Tuple2(dsx, dsy),
			s);
	});
var $author$project$Lib$Render$Text$renderTextWithColor = F6(
	function (gd, size, s, ft, col, pos) {
		return A7($author$project$Lib$Render$Text$renderTextWithColorStyle, gd, size, s, ft, col, '', pos);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$viewModel = F2(
	function (env, d) {
		var tt = function () {
			var _v3 = d.c5;
			if (_v3.$ === 15) {
				var mo = _v3.a;
				return mo.dI;
			} else {
				return 0;
			}
		}();
		var tp = function () {
			var _v2 = d.c5;
			if (_v2.$ === 15) {
				var mo = _v2.a;
				return mo.aK;
			} else {
				return 0;
			}
		}();
		var nt = ((env.Y - tt) <= 1200) ? (env.Y - tt) : (1500 - (env.Y - tt));
		return (!tp) ? _List_fromArray(
			[
				_Utils_Tuple2(
				A2(
					$linsyking$elm_canvas$Canvas$group,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha(
							A2(
								$elm$core$Basics$min,
								1,
								A2($elm$core$Basics$max, 0, nt / 300)))
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$black)
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Lib$Render$Shape$rect,
									env.S,
									_Utils_Tuple2(0, 0),
									_Utils_Tuple2(1920, 1080))
								])),
						A2(
							$elm$core$List$cons,
							function () {
								var _v0 = d.c5;
								if (_v0.$ === 15) {
									var em = _v0.a;
									return (!em.aK) ? A2(
										$linsyking$elm_canvas$Canvas$group,
										_List_Nil,
										_List_fromArray(
											[
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'It\'s ... dark.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 200)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'It\'s getting darker.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 270)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'Until death came, he was still brandishing his weapon.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 340)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 410)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'Cast a cold eye',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 480)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'On life, on death',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 550)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'Horseman, pass by.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 620))
											])) : A2($linsyking$elm_canvas$Canvas$group, _List_Nil, _List_Nil);
								} else {
									return A2($linsyking$elm_canvas$Canvas$group, _List_Nil, _List_Nil);
								}
							}(),
							_List_Nil))),
				10000)
			]) : _List_fromArray(
			[
				_Utils_Tuple2(
				A2(
					$linsyking$elm_canvas$Canvas$group,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha(
							A2(
								$elm$core$Basics$min,
								1,
								A2($elm$core$Basics$max, 0, nt / 300)))
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$black)
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Lib$Render$Shape$rect,
									env.S,
									_Utils_Tuple2(0, 0),
									_Utils_Tuple2(1920, 1080))
								])),
						A2(
							$elm$core$List$cons,
							function () {
								var _v1 = d.c5;
								if (_v1.$ === 15) {
									var em = _v1.a;
									return (em.aK === 1) ? A2(
										$linsyking$elm_canvas$Canvas$group,
										_List_Nil,
										_List_fromArray(
											[
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'Daybreak.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 200)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'He has the sword, he has the gun',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 270)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'Reaching his scatter, for which he plugs chips',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 340)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'At fast pace, with great power',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 410)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'He drew a circle in vain.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 480)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												48,
												'\"Something... for nothing.\"',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 550)),
												A6(
												$author$project$Lib$Render$Text$renderTextWithColor,
												env.S,
												72,
												'HUMAN. TREMBLE FOR ME.',
												'disposabledroid_bbregular',
												$avh4$elm_color$Color$white,
												_Utils_Tuple2(400, 620))
											])) : A2($linsyking$elm_canvas$Canvas$group, _List_Nil, _List_Nil);
								} else {
									return A2($linsyking$elm_canvas$Canvas$group, _List_Nil, _List_Nil);
								}
							}(),
							_List_Nil))),
				10000)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$initModel, env, i),
			dr: 'Ender',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Ender$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel = function (a) {
	return {$: 2, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$Left = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$Right = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$Await = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$NearCamera = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel = {
	aO: 0,
	aR: 30,
	a0: 20,
	a4: 60,
	a5: 4,
	a6: 0,
	bf: 1,
	bz: -1000000,
	bA: -1000000,
	bB: -1000000,
	bC: -1000000,
	bL: 10,
	b_: 1,
	ch: 3,
	dR: _Utils_Tuple2(0, 0),
	d_: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$enemyConfig = F3(
	function (seed, typeId, od) {
		if (!typeId.$) {
			var st = typeId.a;
			switch (st) {
				case 0:
					return _Utils_update(
						od,
						{
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
								_Utils_update(
									$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel,
									{
										aO: 4,
										aR: 60,
										a0: 20,
										a4: 60,
										a5: 4,
										bf: (!A2(
											$author$project$Lib$Tools$RNG$genRandomInt,
											seed,
											_Utils_Tuple2(0, 1))) ? 0 : 1,
										bL: 9.99,
										ch: 3,
										d_: typeId
									})),
							bo: 9.99
						});
				case 1:
					return _Utils_update(
						od,
						{
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
								_Utils_update(
									$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel,
									{
										aO: 2,
										aR: 25,
										a0: 5,
										a4: 60,
										a5: 1,
										bf: (!A2(
											$author$project$Lib$Tools$RNG$genRandomInt,
											seed,
											_Utils_Tuple2(0, 1))) ? 0 : 1,
										bL: 29.99,
										ch: 1,
										d_: typeId
									})),
							bo: 29.99
						});
				case 2:
					return _Utils_update(
						od,
						{
							aM: _Utils_Tuple2(0, 0),
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
								_Utils_update(
									$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel,
									{
										aO: 5,
										aR: 90,
										a0: 10,
										a4: 40,
										a5: 4,
										bf: (!A2(
											$author$project$Lib$Tools$RNG$genRandomInt,
											seed,
											_Utils_Tuple2(0, 1))) ? 0 : 1,
										bL: 7.99,
										ch: 3.4,
										d_: typeId
									})),
							bo: 7.99
						});
				case 3:
					return _Utils_update(
						od,
						{
							aM: _Utils_Tuple2(0, 1),
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
								_Utils_update(
									$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel,
									{
										aO: 3,
										aR: 160,
										a0: 10,
										a4: 200,
										a5: 0,
										bf: (!A2(
											$author$project$Lib$Tools$RNG$genRandomInt,
											seed,
											_Utils_Tuple2(0, 1))) ? 0 : 1,
										bL: 79.99,
										ch: 0,
										d_: typeId
									})),
							bo: 79.99,
							cl: A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
								_Utils_Tuple2(0, 4),
								_Utils_Tuple2(90, 188)),
							ag: _Utils_Tuple2(192, 192)
						});
				default:
					return od;
			}
		} else {
			return _Utils_update(
				od,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
						_Utils_update(
							$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel,
							{
								aO: 8,
								aR: -1,
								a4: 300,
								a5: 30,
								bf: (!A2(
									$author$project$Lib$Tools$RNG$genRandomInt,
									seed,
									_Utils_Tuple2(0, 1))) ? 0 : 1,
								bL: 19.99,
								ch: 5,
								d_: typeId
							})),
					bo: 19.99
				});
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$initModel = F2(
	function (env, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 10)) {
			var id = initData.a;
			var d = initData.b.a;
			var mass = 1;
			return A3(
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$enemyConfig,
				env.Y,
				d.d_,
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(d.ag)(d.bZ)(
					_Utils_Tuple2(0, 0))(
					_Utils_Tuple2(0, $author$project$MainConfig$gravity))(mass)(
					_List_fromArray(
						[$author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox]))(
					A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 5),
						_Utils_Tuple2(70, 70)))(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel))($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$initExtraData));
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Chip = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$DoubleTrigger = 0;
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewChipMsg = function (a) {
	return {$: 4, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$Scatter = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$Splash = 2;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$BulletInit = F7(
	function (startPos, targetPos, velocity, size, bulletType, atk, delay) {
		return {aO: atk, a$: bulletType, be: delay, ag: size, dL: startPos, dR: targetPos, cz: velocity};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$Chase = 2;
var $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$EnemyBullet = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewBulletMsg = function (a) {
	return {$: 3, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$genTarList = F3(
	function (seed, _v0, _v1) {
		var cx = _v0.a;
		var cy = _v0.b;
		var tx = _v1.a;
		var ty = _v1.b;
		var theta = A2($elm$core$Basics$atan2, ty - cy, tx - cx);
		var r = $elm$core$Basics$sqrt(((tx - cx) * (tx - cx)) + ((ty - cy) * (ty - cy)));
		var num = A2(
			$author$project$Lib$Tools$RNG$genRandomInt,
			seed,
			_Utils_Tuple2(4, 12));
		var genT = A2(
			$elm$core$List$map,
			function (i) {
				return _Utils_Tuple2(
					tx + (r * $elm$core$Basics$cos(theta + (((2 * $elm$core$Basics$pi) * i) / num))),
					ty + (r * $elm$core$Basics$sin(theta + (((2 * $elm$core$Basics$pi) * i) / num))));
			},
			A2($elm$core$List$range, 0, num - 1));
		return genT;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateAtk = F2(
	function (env, d) {
		var model = function () {
			var _v4 = d.c5;
			if (_v4.$ === 2) {
				var enemy = _v4.a;
				return enemy;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
			}
		}();
		var _v0 = function () {
			var _v1 = model.d_;
			if (!_v1.$) {
				var st = _v1.a;
				if (model.a6 === 2) {
					var shotIntervalPossible = (_Utils_cmp(env.Y - model.bz, model.aR) > 0) || ((st === 3) && (A2(
						$author$project$Lib$Tools$RNG$genRandomInt,
						(env.Y * d.cx) + 114514,
						_Utils_Tuple2(1, 40)) === 1));
					var fltPosition = _Utils_Tuple2(d.bZ.a, d.bZ.b);
					var _v2 = _Utils_Tuple2(
						A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							env.Y * d.cx,
							_Utils_Tuple2(-16, 16)),
						A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							env.Y + (d.cx * 1926),
							_Utils_Tuple2(-16, 16)));
					var r1 = _v2.a;
					var r2 = _v2.b;
					var _v3 = (!st) ? _Utils_Tuple2(r1 * 2, r2 * 2) : ((st === 1) ? _Utils_Tuple2(r1 * 20, r2 * 20) : ((st === 3) ? _Utils_Tuple2(r1 * 50, r2 * 50) : _Utils_Tuple2(0, 0)));
					var rr1 = _v3.a;
					var rr2 = _v3.b;
					var realTargetPos = _Utils_Tuple2(model.dR.a + rr1, model.dR.b + rr2);
					return shotIntervalPossible ? ((st !== 3) ? _Utils_Tuple2(
						_List_fromArray(
							[
								_Utils_Tuple2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewBulletMsg(
									A7(
										$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$BulletInit,
										fltPosition,
										realTargetPos,
										model.a0,
										_Utils_Tuple2(25, (12.5 / 2) * 2.5),
										$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$EnemyBullet(st),
										model.aO,
										0)))
							]),
						_Utils_update(
							d,
							{
								c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
									_Utils_update(
										model,
										{bz: env.Y}))
							})) : _Utils_Tuple2(
						A2(
							$elm$core$List$map,
							function (p) {
								return _Utils_Tuple2(
									$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
									$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewBulletMsg(
										A7(
											$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$BulletInit,
											fltPosition,
											p,
											model.a0,
											_Utils_Tuple2(40 / 1.2, 25 / 1.2),
											$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$EnemyBullet(st),
											model.aO,
											0)));
							},
							A3($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$genTarList, env.Y, fltPosition, realTargetPos)),
						_Utils_update(
							d,
							{
								c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
									_Utils_update(
										model,
										{bz: env.Y}))
							}))) : _Utils_Tuple2(_List_Nil, d);
				} else {
					return _Utils_Tuple2(_List_Nil, d);
				}
			} else {
				return _Utils_Tuple2(_List_Nil, d);
			}
		}();
		var gcmsg = _v0.a;
		var nnd = _v0.b;
		return _Utils_Tuple3(nnd, gcmsg, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateDir = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var tileMap = env.bb.dT;
	var omodel = function () {
		var _v8 = d.c5;
		if (_v8.$ === 2) {
			var model = _v8.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
		}
	}();
	var odir = omodel.bf;
	var nxtTile = (odir === 1) ? 1 : (-1);
	var _v1 = omodel.dR;
	var pposx = _v1.a;
	var pposy = _v1.b;
	var _v2 = _Utils_Tuple2(((d.bZ.a / $author$project$MainConfig$tileSize) | 0) + nxtTile, (d.bZ.b / $author$project$MainConfig$tileSize) | 0);
	var nposx = _v2.a;
	var nposy = _v2.b;
	var isFacingCliff = function (t) {
		return !A2($elm$core$Basics$modBy, 2, t);
	}(
		A2(
			$elm$core$Maybe$withDefault,
			1,
			A3($tortus$elm_array_2d$Array2D$get, nposx, nposy + 1, tileMap)));
	var isFacingWall = function (t) {
		return A2($elm$core$Basics$modBy, 2, t) === 1;
	}(
		A2(
			$elm$core$Maybe$withDefault,
			1,
			A3($tortus$elm_array_2d$Array2D$get, nposx, nposy, tileMap))) && ((odir === 1) ? (A2($elm$core$Basics$modBy, $author$project$MainConfig$tileSize, d.bZ.a) >= 32) : (A2($elm$core$Basics$modBy, $author$project$MainConfig$tileSize, d.bZ.a) <= 32));
	var _v3 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, d.bZ);
	var eposx = _v3.a;
	var eposy = _v3.b;
	var ndir = function () {
		var _v5 = omodel.d_;
		if (!_v5.$) {
			var st = _v5.a;
			var _v6 = omodel.a6;
			switch (_v6) {
				case 0:
					return odir;
				case 1:
					var isChange = ((env.Y - omodel.bC) > 20) && (isFacingWall || (isFacingCliff && (st <= 1)));
					return isChange ? ((odir === 1) ? 0 : 1) : odir;
				default:
					if (!st) {
						return (_Utils_cmp(
							pposx,
							eposx + (omodel.a4 + A2(
								$author$project$Lib$Tools$RNG$genRandomInt,
								(env.Y * d.cx) * 2,
								_Utils_Tuple2(-10, 10)))) > 0) ? 1 : ((_Utils_cmp(
							pposx,
							eposx - (omodel.a4 + A2(
								$author$project$Lib$Tools$RNG$genRandomInt,
								(env.Y * d.cx) * 2,
								_Utils_Tuple2(-10, 10)))) < 0) ? 0 : odir);
					} else {
						if (st === 1) {
							var peright = _Utils_cmp(
								pposx,
								eposx + (omodel.a4 + A2(
									$author$project$Lib$Tools$RNG$genRandomInt,
									(env.Y * d.cx) * 2,
									_Utils_Tuple2(-10, 10)))) > 0;
							var peleft = _Utils_cmp(
								pposx,
								eposx - (omodel.a4 + A2(
									$author$project$Lib$Tools$RNG$genRandomInt,
									(env.Y * d.cx) * 2,
									_Utils_Tuple2(-10, 10)))) < 0;
							var isChange = (((env.Y - omodel.bC) > 60) && (((!omodel.bf) && peright) || ((omodel.bf === 1) && peleft))) || (isFacingWall || isFacingCliff);
							return isChange ? ((odir === 1) ? 0 : 1) : odir;
						} else {
							if (st === 2) {
								var peright = _Utils_cmp(
									pposx,
									eposx + (omodel.a4 + A2(
										$author$project$Lib$Tools$RNG$genRandomInt,
										(env.Y * d.cx) * 2,
										_Utils_Tuple2(-10, 10)))) > 0;
								var peleft = _Utils_cmp(
									pposx,
									eposx - (omodel.a4 + A2(
										$author$project$Lib$Tools$RNG$genRandomInt,
										(env.Y * d.cx) * 2,
										_Utils_Tuple2(-10, 10)))) < 0;
								var isChange = (((env.Y - omodel.bC) > 60) && (((!omodel.bf) && peright) || ((omodel.bf === 1) && peleft))) || isFacingWall;
								return isChange ? ((odir === 1) ? 0 : 1) : odir;
							} else {
								return odir;
							}
						}
					}
			}
		} else {
			var _v7 = omodel.a6;
			switch (_v7) {
				case 0:
					return odir;
				case 1:
					return (isFacingWall || isFacingCliff) ? ((odir === 1) ? 0 : 1) : odir;
				default:
					var peright = _Utils_cmp(
						pposx,
						eposx + (omodel.a4 + A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							(env.Y * d.cx) * 2,
							_Utils_Tuple2(-10, 10)))) > 0;
					var peleft = _Utils_cmp(
						pposx,
						eposx - (omodel.a4 + A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							(env.Y * d.cx) * 2,
							_Utils_Tuple2(-10, 10)))) < 0;
					var isChange = (((env.Y - omodel.bC) > 180) && (((!omodel.bf) && peright) || ((omodel.bf === 1) && peleft))) || (isFacingWall || isFacingCliff);
					return isChange ? ((odir === 1) ? 0 : 1) : odir;
			}
		}
	}();
	var nTurnTime = _Utils_eq(ndir, odir) ? omodel.bC : env.Y;
	var _v4 = _Utils_Tuple3(
		_Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
					_Utils_update(
						omodel,
						{bf: ndir, bC: nTurnTime}))
			}),
		_List_Nil,
		env);
	var nd = _v4.a;
	var nls = _v4.b;
	var nenv = _v4.c;
	return _Utils_Tuple3(nd, nls, nenv);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$rotVel = F3(
	function (r, seed, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var theta = A2($elm$core$Basics$atan2, y, x);
		var ntheta = theta + (0.03 * ((A2(
			$author$project$Lib$Tools$RNG$genRandomInt,
			seed,
			_Utils_Tuple2(-100, 100)) / 200) / 100));
		var nr = r + (A2(
			$author$project$Lib$Tools$RNG$genRandomInt,
			seed * 2,
			_Utils_Tuple2(-100, 100)) / 200);
		var nx = nr * $elm$core$Basics$cos(ntheta);
		var ny = nr * $elm$core$Basics$sin(ntheta);
		return _Utils_Tuple2(nx, ny);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$tarVel = F3(
	function (_v0, _v1, _v2) {
		var tx = _v0.a;
		var ty = _v0.b;
		var cx = _v1.a;
		var cy = _v1.b;
		var vx = _v2.a;
		var vy = _v2.b;
		var theta = A2($elm$core$Basics$atan2, ty - cy, tx - cx);
		var r = $elm$core$Basics$sqrt((vx * vx) + (vy * vy));
		var ctheta = A2($elm$core$Basics$atan2, vy, vx);
		var ntheta = ((ctheta * 5) + theta) / 6;
		var nx = r * $elm$core$Basics$cos(ntheta);
		var ny = r * $elm$core$Basics$sin(ntheta);
		return _Utils_Tuple2(nx, ny);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateVel = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var tileMap = env.bb.dT;
	var randomV = A2(
		$author$project$Lib$Tools$RNG$genRandomInt,
		env.Y * d.cx,
		_Utils_Tuple2(-100, 100)) / 100;
	var ovel = d.cz;
	var omodel = function () {
		var _v7 = d.c5;
		if (_v7.$ === 2) {
			var model = _v7.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
		}
	}();
	var odir = omodel.bf;
	var nvel = ovel;
	var nvel2 = function () {
		var _v2 = omodel.d_;
		if (!_v2.$) {
			var st = _v2.a;
			return function (v) {
				if (!st) {
					var _v5 = omodel.a6;
					if (!_v5) {
						return _Utils_Tuple2(0, v.b);
					} else {
						return _Utils_Tuple2(v.a + randomV, v.b);
					}
				} else {
					return v;
				}
			}(
				function () {
					if (st !== 2) {
						var _v3 = omodel.a6;
						switch (_v3) {
							case 0:
								return _Utils_Tuple2(0, nvel.b);
							case 1:
								return (odir === 1) ? _Utils_Tuple2(omodel.ch, nvel.b) : _Utils_Tuple2(-omodel.ch, nvel.b);
							default:
								return (odir === 1) ? _Utils_Tuple2(omodel.a5, nvel.b) : _Utils_Tuple2(-omodel.a5, nvel.b);
						}
					} else {
						var _v4 = omodel.a6;
						switch (_v4) {
							case 0:
								return A3($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$rotVel, omodel.ch, (env.Y + 1206) - d.cx, nvel);
							case 1:
								return A3($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$rotVel, omodel.ch, (env.Y + 1206) - d.cx, nvel);
							default:
								return A3(
									$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$tarVel,
									omodel.dR,
									A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, d.bZ),
									A3($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$rotVel, omodel.ch, (env.Y + 1206) - d.cx, nvel));
						}
					}
				}());
		} else {
			var _v6 = omodel.a6;
			switch (_v6) {
				case 0:
					return _Utils_Tuple2(0, nvel.b);
				case 1:
					return ((env.Y - omodel.bC) > 90) ? ((odir === 1) ? _Utils_Tuple2(omodel.ch, nvel.b) : _Utils_Tuple2(-omodel.ch, nvel.b)) : _Utils_Tuple2(0, nvel.b);
				default:
					return ((env.Y - omodel.bC) > 90) ? ((odir === 1) ? _Utils_Tuple2(omodel.a5, nvel.b) : _Utils_Tuple2(-omodel.a5, nvel.b)) : _Utils_Tuple2(0, nvel.b);
			}
		}
	}();
	var _v1 = (!_Utils_eq(
		omodel.d_,
		$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(2))) ? $author$project$SceneProtos$CoreEngine$Physics$Movement$updateVelByAcc(
		_Utils_Tuple2(
			env,
			_Utils_update(
				d,
				{cz: nvel2}))) : _Utils_Tuple2(
		env,
		_Utils_update(
			d,
			{cz: nvel2}));
	var newenv = _v1.a;
	var newdata = _v1.b;
	return _Utils_Tuple3(newdata, ls, newenv);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateAliveModel = F2(
	function (env, d) {
		var _v0 = $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateDir(
			$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateVel(
				_Utils_Tuple3(d, _List_Nil, env)));
		var nd = _v0.a;
		var nl = _v0.b;
		var nenv = _v0.c;
		var _v1 = $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideXY(
			_Utils_Tuple2(nenv, nd));
		var nenv2 = _v1.a;
		var nd2 = _v1.b;
		var _v2 = A2($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateAtk, nenv2, nd2);
		var rd = _v2.a;
		var rl = _v2.b;
		var renv = _v2.c;
		return _Utils_Tuple3(
			rd,
			_Utils_ap(nl, rl),
			renv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateModel = F2(
	function (env, d) {
		var _v0 = env.w;
		if (!_v0.$) {
			var _v1 = d.dg;
			if (!_v1.$) {
				return A2($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateAliveModel, env, d);
			} else {
				var dt = _v1.a;
				var coinNum = A2(
					$author$project$Lib$Tools$RNG$genRandomInt,
					(env.Y + d.cx) + 817,
					_Utils_Tuple2(1, 5));
				var goldCoin = (coinNum / 5) | 0;
				var silverCoin = coinNum - (goldCoin * 5);
				var nCoinMsg = (dt === 5) ? _Utils_ap(
					A2(
						$elm$core$List$repeat,
						goldCoin,
						_Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewChipMsg(
								{
									bZ: d.bZ,
									aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Coin(5)
								}))),
					A2(
						$elm$core$List$repeat,
						silverCoin,
						_Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewChipMsg(
								{
									bZ: d.bZ,
									aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Coin(1)
								})))) : _List_Nil;
				var chipRand = A2(
					$author$project$Lib$Tools$RNG$genRandomInt,
					(env.Y + (d.cx * 2)) + 12306,
					_Utils_Tuple2(1, 9));
				var nChipMsg = function () {
					if (dt === 5) {
						switch (chipRand) {
							case 1:
								return _List_fromArray(
									[
										_Utils_Tuple2(
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewChipMsg(
											{
												bZ: d.bZ,
												aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Chip(0)
											}))
									]);
							case 2:
								return _List_fromArray(
									[
										_Utils_Tuple2(
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewChipMsg(
											{
												bZ: d.bZ,
												aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Chip(1)
											}))
									]);
							case 3:
								return _List_fromArray(
									[
										_Utils_Tuple2(
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewChipMsg(
											{
												bZ: d.bZ,
												aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Chip(2)
											}))
									]);
							default:
								return _List_Nil;
						}
					} else {
						return _List_Nil;
					}
				}();
				return _Utils_Tuple3(
					_Utils_update(
						d,
						{
							dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(dt + 1)
						}),
					_Utils_ap(nCoinMsg, nChipMsg),
					env);
			}
		} else {
			return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$Search = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$dist = F2(
	function (_v0, _v1) {
		var x1 = _v0.a;
		var y1 = _v0.b;
		var x2 = _v1.a;
		var y2 = _v1.b;
		var dy = y1 - y2;
		var dx = x1 - x2;
		return $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateChasingState = F2(
	function (pos, _v0) {
		var d = _v0.a;
		var ls = _v0.b;
		var env = _v0.c;
		var omodel = function () {
			var _v5 = d.c5;
			if (_v5.$ === 2) {
				var model = _v5.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
			}
		}();
		var _v1 = pos;
		var pposx = _v1.a;
		var pposy = _v1.b;
		var _v2 = d.bZ;
		var eposx = _v2.a;
		var eposy = _v2.b;
		var isFarAway = _Utils_cmp(
			A2(
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$dist,
				_Utils_Tuple2(pposx, pposy),
				_Utils_Tuple2(eposx, eposy)),
			32 * $author$project$MainConfig$tileSize) > 0;
		var isNear = isFarAway ? false : ((_Utils_cmp(
			A2(
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$dist,
				_Utils_Tuple2(pposx, pposy),
				_Utils_Tuple2(eposx, eposy)),
			8 * $author$project$MainConfig$tileSize) < 0) ? true : false);
		var nChasingState = function () {
			var _v4 = omodel.a6;
			switch (_v4) {
				case 0:
					return (!isFarAway) ? 1 : 0;
				case 1:
					return isFarAway ? 0 : (isNear ? 2 : 1);
				default:
					return isFarAway ? 0 : 2;
			}
		}();
		var _v3 = _Utils_Tuple3(
			_Utils_update(
				d,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
						_Utils_update(
							omodel,
							{
								a6: nChasingState,
								dR: A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, pos)
							}))
				}),
			_List_Nil,
			env);
		var nd = _v3.a;
		var nls = _v3.b;
		var nenv = _v3.c;
		return _Utils_Tuple3(nd, nls, nenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateTarget = F2(
	function (ppos, _v0) {
		var d = _v0.a;
		var ls = _v0.b;
		var env = _v0.c;
		var omodel = function () {
			var _v1 = d.c5;
			if (_v1.$ === 2) {
				var model = _v1.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
			}
		}();
		return _Utils_Tuple3(
			_Utils_update(
				d,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
						_Utils_update(
							omodel,
							{
								dR: A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, ppos)
							}))
				}),
			ls,
			env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateModelRec = F3(
	function (env, gcmsg, d) {
		var judgeHitByTime = 10;
		var emodel = function () {
			var _v6 = d.c5;
			if (_v6.$ === 2) {
				var model = _v6.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
			}
		}();
		switch (gcmsg.$) {
			case 2:
				var pos = gcmsg.a;
				return A2(
					$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateTarget,
					pos,
					A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateChasingState,
						pos,
						_Utils_Tuple3(d, _List_Nil, env)));
			case 8:
				var gcModel = gcmsg.a;
				if (gcModel.$ === 5) {
					var bullet = gcModel.a;
					var nhp = d.bo - bullet.aO;
					return function (_v2) {
						var dd = _v2.a;
						var ll = _v2.b;
						var ee = _v2.c;
						return _Utils_Tuple3(
							_Utils_update(
								dd,
								{
									c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
										_Utils_update(
											emodel,
											{bA: env.Y}))
								}),
							ll,
							ee);
					}(
						(nhp <= 0) ? (_Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive) ? _Utils_Tuple3(
							_Utils_update(
								d,
								{
									bo: nhp,
									dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
								}),
							_List_Nil,
							env) : _Utils_Tuple3(
							_Utils_update(
								d,
								{bo: nhp}),
							_List_Nil,
							env)) : _Utils_Tuple3(
							_Utils_update(
								d,
								{bo: nhp}),
							_List_Nil,
							env));
				} else {
					return _Utils_Tuple3(d, _List_Nil, env);
				}
			case 14:
				var gcModel = gcmsg.a;
				if (gcModel.$ === 3) {
					var weapon = gcModel.a;
					var ratk = weapon.aO * (1 + $elm$core$List$length(weapon.d4.d1));
					var nhp = d.bo - weapon.aO;
					return (_Utils_cmp(env.Y - emodel.bA, judgeHitByTime) > -1) ? function (_v4) {
						var dd = _v4.a;
						var ll = _v4.b;
						var ee = _v4.c;
						return _Utils_Tuple3(
							_Utils_update(
								dd,
								{
									c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
										_Utils_update(
											emodel,
											{bA: env.Y}))
								}),
							ll,
							ee);
					}(
						(nhp <= 0) ? (_Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive) ? _Utils_Tuple3(
							_Utils_update(
								d,
								{
									bo: nhp,
									dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
								}),
							_List_Nil,
							env) : _Utils_Tuple3(
							_Utils_update(
								d,
								{bo: nhp}),
							_List_Nil,
							env)) : _Utils_Tuple3(
							_Utils_update(
								d,
								{bo: nhp}),
							_List_Nil,
							env)) : _Utils_Tuple3(d, _List_Nil, env);
				} else {
					return _Utils_Tuple3(d, _List_Nil, env);
				}
			case 15:
				var _v5 = d.c5;
				if (_v5.$ === 2) {
					var enemy = _v5.a;
					return _Utils_Tuple3(
						_Utils_update(
							d,
							{
								c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyModel(
									_Utils_update(
										enemy,
										{bB: env.Y}))
							}),
						_List_Nil,
						env);
				} else {
					return _Utils_Tuple3(d, _List_Nil, env);
				}
			default:
				return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Display$debug = F2(
	function (env, d) {
		var tileMap = env.bb.dT;
		var ovel = d.cz;
		var omodel = function () {
			var _v2 = d.c5;
			if (_v2.$ === 2) {
				var model = _v2.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
			}
		}();
		var odir = omodel.bf;
		var nxtTile = (odir === 1) ? 1 : (-1);
		var nvel = ovel;
		var _v0 = d.bZ;
		var posx = _v0.a;
		var posy = _v0.b;
		var _v1 = _Utils_Tuple2(((d.bZ.a / $author$project$MainConfig$tileSize) | 0) + nxtTile, (d.bZ.b / $author$project$MainConfig$tileSize) | 0);
		var nposx = _v1.a;
		var nposy = _v1.b;
		var isFacingWall = function (t) {
			return A2($elm$core$Basics$modBy, 2, t) === 1;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				1,
				A3($tortus$elm_array_2d$Array2D$get, nposx, nposy, tileMap)));
		return _List_Nil;
	});
var $author$project$Lib$Render$Sprite$renderSpriteWithRev_ = F5(
	function (gd, ls, p, _v0, t) {
		var w = _v0.a;
		var h = _v0.b;
		var text_dim = $linsyking$elm_canvas$Canvas$Texture$dimensions(t);
		var text_height = text_dim.bl;
		var text_width = text_dim.cC;
		var rw = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, w);
		var width_s = rw / text_width;
		var rh = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, h);
		var height_s = rh / text_height;
		var _v1 = A2($author$project$Lib$Coordinate$Coordinates$posToReal, gd, p);
		var newx = _v1.a;
		var newy = _v1.b;
		return ((w > 0) && (h > 0)) ? A3(
			$linsyking$elm_canvas$Canvas$texture,
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
					_List_fromArray(
						[
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, newx, newy),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$scale, -width_s, height_s),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, -text_width, 0)
						])),
				ls),
			_Utils_Tuple2(0, 0),
			t) : (((w > 0) && (h <= 0)) ? A3(
			$linsyking$elm_canvas$Canvas$texture,
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
					_List_fromArray(
						[
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, newx, newy),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$scale, -width_s, width_s),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, -text_width, 0)
						])),
				ls),
			_Utils_Tuple2(0, 0),
			t) : (((w <= 0) && (h > 0)) ? A3(
			$linsyking$elm_canvas$Canvas$texture,
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
					_List_fromArray(
						[
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, newx, newy),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$scale, -height_s, height_s),
							A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, -text_width, 0)
						])),
				ls),
			_Utils_Tuple2(0, 0),
			t) : A3(
			$linsyking$elm_canvas$Canvas$texture,
			ls,
			_Utils_Tuple2(newx, newy),
			t)));
	});
var $author$project$Lib$Render$Sprite$renderSpriteWithRev = F6(
	function (rev, gd, ls, p, size, name) {
		if (!rev) {
			return A5($author$project$Lib$Render$Sprite$renderSprite, gd, ls, p, size, name);
		} else {
			var _v0 = A2($author$project$Lib$Resources$Base$igetSprite, name, gd.dc.dH);
			if (!_v0.$) {
				var t = _v0.a;
				return A5($author$project$Lib$Render$Sprite$renderSpriteWithRev_, gd, ls, p, size, t);
			} else {
				return $linsyking$elm_canvas$Canvas$empty;
			}
		}
	});
var $linsyking$elm_canvas$Canvas$Settings$stroke = function (color) {
	return $linsyking$elm_canvas$Canvas$Internal$Canvas$SettingDrawOp(
		$linsyking$elm_canvas$Canvas$Internal$Canvas$Stroke(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$Color(color)));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Display$displayEnemy = F2(
	function (env, d) {
		var omodel = function () {
			var _v9 = d.c5;
			if (_v9.$ === 2) {
				var model = _v9.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$nullModel;
			}
		}();
		var revFlag = function () {
			var _v8 = omodel.bf;
			switch (_v8) {
				case 0:
					return false;
				case 1:
					return true;
				default:
					return false;
			}
		}();
		var id = function () {
			var _v5 = omodel.d_;
			_v5$5:
			while (true) {
				if (!_v5.$) {
					switch (_v5.a) {
						case 0:
							return 'enemy_1';
						case 1:
							return 'enemy_2';
						case 2:
							return 'enemy_5';
						case 3:
							var _v6 = d.dg;
							if (!_v6.$) {
								var _v7 = A2($elm$core$Basics$modBy, 10, (env.Y / 15) | 0);
								switch (_v7) {
									case 0:
										return 'elite_1';
									case 1:
										return 'elite_2';
									case 2:
										return 'elite_1';
									case 3:
										return 'elite_2';
									case 4:
										return 'elite_1';
									case 5:
										return 'elite_2';
									case 6:
										return 'elite_3';
									case 7:
										return 'elite_4';
									case 8:
										return 'elite_1';
									case 9:
										return 'elite_2';
									default:
										return 'elite_1';
								}
							} else {
								var dt = _v6.a;
								var idd = A2(
									$elm$core$Basics$max,
									1,
									A2($elm$core$Basics$min, 8, (dt / 10) | 0));
								return 'elite_d' + $elm$core$String$fromInt(idd);
							}
						default:
							break _v5$5;
					}
				} else {
					if (!_v5.a) {
						return 'enemy_4';
					} else {
						break _v5$5;
					}
				}
			}
			return 'enemy_5';
		}();
		var hpRate = A2($elm$core$Basics$max, d.bo, 0) / omodel.bL;
		var alphaVal = function () {
			if (!_Utils_eq(
				omodel.d_,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(3))) {
				var _v3 = d.dg;
				if (!_v3.$) {
					return 1.0;
				} else {
					var dt = _v3.a;
					return A2($elm$core$Basics$max, 0, 1.0 - (dt / 30));
				}
			} else {
				var _v4 = d.dg;
				if (!_v4.$) {
					return 1.0;
				} else {
					var dt = _v4.a;
					return A2($elm$core$Basics$max, 0, 1.0 - (dt / 180));
				}
			}
		}();
		var _v0 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var x_ = _v0.a;
		var y_ = _v0.b;
		var _v1 = A2(
			$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
			env,
			_Utils_Tuple2(
				0,
				(!_Utils_eq(
					omodel.d_,
					$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(3))) ? 15 : 20));
		var neh = _v1.b;
		var _v2 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam, env, d.ag);
		var w = _v2.a;
		var h = _v2.b;
		var y = y_ - (h / 2);
		var x = x_ - (w / 2);
		var hpBox = A3(
			$author$project$Lib$Render$Shape$rect,
			env.S,
			_Utils_Tuple2(x, y - (neh * 2)),
			_Utils_Tuple2(w, neh));
		var hpShow = A3(
			$author$project$Lib$Render$Shape$rect,
			env.S,
			_Utils_Tuple2(x + 2, y - ((neh - 1) * 2)),
			_Utils_Tuple2((w - 4) * hpRate, neh - 4));
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false),
					$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha(alphaVal)
				]),
			A2(
				$elm$core$List$cons,
				A6(
					$author$project$Lib$Render$Sprite$renderSpriteWithRev,
					revFlag,
					env.S,
					_List_Nil,
					_Utils_Tuple2(x, y),
					_Utils_Tuple2(w, h),
					id),
				A2(
					$elm$core$List$cons,
					A2(
						$linsyking$elm_canvas$Canvas$shapes,
						_List_fromArray(
							[
								$linsyking$elm_canvas$Canvas$Settings$stroke($avh4$elm_color$Color$black),
								$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$white)
							]),
						_List_fromArray(
							[hpBox])),
					A2(
						$elm$core$List$cons,
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$red)
								]),
							_List_fromArray(
								[hpShow])),
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Display$debug, env, d)))));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Display$displayEnemy, env, d),
				3)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$initModel, env, i),
			dr: 'Enemy',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCGameMapModel = function (a) {
	return {$: 6, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GenBlueprint = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Blueprint$nullBlueprint = {
	bh: _Utils_Tuple2(0, 0),
	bV: _List_Nil,
	cb: 0,
	cc: A3($tortus$elm_array_2d$Array2D$repeat, 6, 6, 0),
	cq: _Utils_Tuple2(0, 0),
	cw: _List_Nil
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 13)) {
			var id = initData.a;
			var d = initData.b.a;
			return _Utils_update(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCGameMapModel(
						{
							aX: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Blueprint$nullBlueprint,
							bH: $tortus$elm_array_2d$Array2D$empty,
							bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading(0),
							bJ: _List_Nil,
							cm: $tortus$elm_array_2d$Array2D$empty,
							cn: _Utils_Tuple2(
								_Utils_Tuple2(0, 0),
								_Utils_Tuple2(0, 0)),
							cr: _List_Nil,
							cs: _List_Nil
						}),
					cx: id
				});
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GenEnemy = 4;
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GenStore = 5;
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPointList = F2(
	function (n, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$elm$core$List$map,
			function (t) {
				return _Utils_Tuple2((x * 64) + (t * 64), y * 64);
			},
			A2(
				$elm$core$List$map,
				function (t) {
					return (((t + 1) / 2) | 0) * ((!A2($elm$core$Basics$modBy, 2, t)) ? (-1) : 1);
				},
				A2($elm$core$List$range, 0, n - 1)));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calEnemyPoint = function (ls) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
			$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitEnemyMsg(
				A2(
					$elm$core$List$concatMap,
					function (_v0) {
						var _v1 = _v0.a;
						var px = _v1.a;
						var py = _v1.b;
						var n = _v0.b;
						var et = _v0.c;
						return A2(
							$elm$core$List$map,
							function (p) {
								return {dt: p, d_: et};
							},
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPointList,
								n,
								_Utils_Tuple2(px, py)));
					},
					ls)))
		]);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPoint = function (_v0) {
	var _v1 = _v0.a;
	var a = _v1.a;
	var b = _v1.b;
	var _v2 = _v0.b;
	var x = _v2.a;
	var y = _v2.b;
	return _Utils_Tuple2(((a * 32) + x) * 64, ((b * 32) + y) * 64);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GenRooms = 1;
var $author$project$Lib$Tools$RNG$genRandomIntWithSeed = F2(
	function (t, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$step,
			$author$project$Lib$Tools$RNG$genInt(
				_Utils_Tuple2(a, b)),
			t);
	});
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$isOut = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return (x < 0) || ((x > 5) || ((y < 0) || (y > 5)));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveDown = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(x, y + 1);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveLeft = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(x - 1, y);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveRight = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(x + 1, y);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveUp = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(x, y - 1);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genPath_ = function (_v0) {
	genPath_:
	while (true) {
		var t = _v0.a;
		var ls = _v0.b;
		var _v1 = _v0.c;
		var cnt = _v1.a;
		var max = _v1.b;
		var pre = A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm$core$List$head(ls));
		var next0 = _List_Nil;
		var next1 = ($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$isOut(
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveUp(pre)) || A2(
			$elm$core$List$member,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveUp(pre),
			ls)) ? next0 : A2(
			$elm$core$List$cons,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveUp(pre),
			next0);
		var next2 = ($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$isOut(
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveRight(pre)) || A2(
			$elm$core$List$member,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveRight(pre),
			ls)) ? next1 : A2(
			$elm$core$List$cons,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveRight(pre),
			next1);
		var next3 = ($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$isOut(
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveDown(pre)) || A2(
			$elm$core$List$member,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveDown(pre),
			ls)) ? next2 : A2(
			$elm$core$List$cons,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveDown(pre),
			next2);
		var next4 = ($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$isOut(
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveLeft(pre)) || A2(
			$elm$core$List$member,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveLeft(pre),
			ls)) ? next3 : A2(
			$elm$core$List$cons,
			$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$moveLeft(pre),
			next3);
		var validCnt = $elm$core$List$length(next4);
		var _v2 = A2(
			$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
			t,
			_Utils_Tuple2(1, 100));
		var r = _v2.a;
		var seed0 = _v2.b;
		if ($elm$core$List$isEmpty(next4) || (_Utils_cmp(cnt, max) > -1)) {
			return _Utils_Tuple3(
				seed0,
				ls,
				_Utils_Tuple2(cnt, max));
		} else {
			var $temp$_v0 = _Utils_Tuple3(
				seed0,
				A2(
					$elm$core$List$cons,
					A2(
						$elm$core$Maybe$withDefault,
						_Utils_Tuple2(0, 0),
						A2(
							$elm_community$list_extra$List$Extra$getAt,
							A2($elm$core$Basics$modBy, validCnt, r),
							next4)),
					ls),
				_Utils_Tuple2(cnt + 1, max));
			_v0 = $temp$_v0;
			continue genPath_;
		}
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genPath = function (_v0) {
	var t = _v0.a;
	var bp = _v0.b;
	var rooms = bp.cc;
	var _v1 = A2(
		$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
		t,
		_Utils_Tuple2(10, 16));
	var roomCnt = _v1.a;
	var seed0 = _v1.b;
	var _v2 = A2(
		$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
		seed0,
		_Utils_Tuple2(0, 5));
	var initX = _v2.a;
	var seed1 = _v2.b;
	var _v3 = A2(
		$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
		seed1,
		_Utils_Tuple2(0, 5));
	var initY = _v3.a;
	var seed2 = _v3.b;
	var _v4 = $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genPath_(
		_Utils_Tuple3(
			seed2,
			_List_fromArray(
				[
					_Utils_Tuple2(initX, initY)
				]),
			_Utils_Tuple2(1, roomCnt)));
	var seed3 = _v4.a;
	var ls = _v4.b;
	var _v5 = _v4.c;
	var cnt = _v5.a;
	var nrooms = A3(
		$elm$core$List$foldl,
		F2(
			function (_v6, arr) {
				var x = _v6.a;
				var y = _v6.b;
				return A4($tortus$elm_array_2d$Array2D$set, x, y, 1, arr);
			}),
		rooms,
		ls);
	return _Utils_Tuple3(
		seed3,
		_Utils_update(
			bp,
			{cb: cnt, cc: nrooms}),
		ls);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genStores = F3(
	function (arr, seed, n) {
		genStores:
		while (true) {
			var _v0 = A2(
				$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
				seed,
				_Utils_Tuple2(0, 5));
			var x = _v0.a;
			var seed0 = _v0.b;
			var _v1 = A2(
				$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
				seed0,
				_Utils_Tuple2(0, 5));
			var y = _v1.a;
			var seed1 = _v1.b;
			if (!n) {
				return arr;
			} else {
				if (!A2(
					$elm$core$Maybe$withDefault,
					1,
					A3($tortus$elm_array_2d$Array2D$get, x, y, arr))) {
					var $temp$arr = A4($tortus$elm_array_2d$Array2D$set, x, y, -5, arr),
						$temp$seed = seed1,
						$temp$n = n - 1;
					arr = $temp$arr;
					seed = $temp$seed;
					n = $temp$n;
					continue genStores;
				} else {
					var $temp$arr = arr,
						$temp$seed = seed1,
						$temp$n = n;
					arr = $temp$arr;
					seed = $temp$seed;
					n = $temp$n;
					continue genStores;
				}
			}
		}
	});
var $author$project$Lib$Coordinate$Coordinates$equal = F2(
	function (_v0, _v1) {
		var x1 = _v0.a;
		var y1 = _v0.b;
		var x2 = _v1.a;
		var y2 = _v1.b;
		return _Utils_eq(x1, x2) && _Utils_eq(y1, y2);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$judgeType = F3(
	function (_v0, _v1, _v2) {
		var prevx = _v0.a;
		var prevy = _v0.b;
		var x = _v1.a;
		var y = _v1.b;
		var nextx = _v2.a;
		var nexty = _v2.b;
		return A2(
			$author$project$Lib$Coordinate$Coordinates$equal,
			_Utils_Tuple2(prevx, prevy),
			_Utils_Tuple2(x, y)) ? ((_Utils_eq(nextx, x) && _Utils_eq(nexty, y - 1)) ? (-1) : ((_Utils_eq(nextx, x) && _Utils_eq(nexty, y + 1)) ? (-3) : ((_Utils_eq(nextx, x + 1) && _Utils_eq(nexty, y)) ? (-2) : ((_Utils_eq(nextx, x - 1) && _Utils_eq(nexty, y)) ? (-4) : 0)))) : ((_Utils_eq(prevy, y) && _Utils_eq(y, nexty)) ? 1 : ((_Utils_eq(prevx, x) && _Utils_eq(x, nextx)) ? 2 : (((_Utils_eq(prevx, x - 1) && (_Utils_eq(prevy, y) && (_Utils_eq(nextx, x) && _Utils_eq(nexty, y - 1)))) || (_Utils_eq(nextx, x - 1) && (_Utils_eq(nexty, y) && (_Utils_eq(prevx, x) && _Utils_eq(prevy, y - 1))))) ? 3 : (((_Utils_eq(prevx, x + 1) && (_Utils_eq(prevy, y) && (_Utils_eq(nextx, x) && _Utils_eq(nexty, y - 1)))) || (_Utils_eq(nextx, x + 1) && (_Utils_eq(nexty, y) && (_Utils_eq(prevx, x) && _Utils_eq(prevy, y - 1))))) ? 4 : (((_Utils_eq(prevx, x - 1) && (_Utils_eq(prevy, y) && (_Utils_eq(nextx, x) && _Utils_eq(nexty, y + 1)))) || (_Utils_eq(nextx, x - 1) && (_Utils_eq(nexty, y) && (_Utils_eq(prevx, x) && _Utils_eq(prevy, y + 1))))) ? 5 : (((_Utils_eq(prevx, x + 1) && (_Utils_eq(prevy, y) && (_Utils_eq(nextx, x) && _Utils_eq(nexty, y + 1)))) || (_Utils_eq(nextx, x + 1) && (_Utils_eq(nexty, y) && (_Utils_eq(prevx, x) && _Utils_eq(prevy, y + 1))))) ? 6 : 0))))));
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $elm$core$List$map3 = _List_map3;
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genBlueprint = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var seed0 = $author$project$Lib$Tools$RNG$seed(
		$elm$time$Time$posixToMillis(env.S.cU));
	var initBp = model.aX;
	var _v1 = $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genPath(
		_Utils_Tuple2(seed0, initBp));
	var seed1 = _v1.a;
	var nbp = _v1.b;
	var ls = _v1.c;
	var end = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(0, 0),
		$elm$core$List$head(ls));
	var nextl = A2($elm$core$List$drop, 2, ls);
	var prevl = A2(
		$elm$core$List$take,
		$elm$core$List$length(ls) - 2,
		ls);
	var start = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(0, 0),
		$elm_community$list_extra$List$Extra$last(ls));
	var thisl = A2(
		$elm$core$List$drop,
		1,
		A2(
			$elm$core$List$take,
			$elm$core$List$length(ls) - 1,
			ls));
	var endtype = function () {
		var penult = A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm$core$List$head(thisl));
		return A3($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$judgeType, end, end, penult);
	}();
	var starttype = function () {
		var second = A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm_community$list_extra$List$Extra$last(thisl));
		return A3($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$judgeType, start, start, second);
	}();
	var typelist = A4(
		$elm$core$List$map3,
		F3(
			function (prev, _this, next) {
				return A3($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$judgeType, prev, _this, next);
			}),
		prevl,
		thisl,
		nextl);
	var typeMap = A3(
		$elm$core$List$foldl,
		F2(
			function (_v5, arr) {
				var _v6 = _v5.a;
				var x = _v6.a;
				var y = _v6.b;
				var t = _v5.b;
				return A4($tortus$elm_array_2d$Array2D$set, x, y, t, arr);
			}),
		nbp.cc,
		A3(
			$elm$core$List$map2,
			F2(
				function (_v7, t) {
					var x = _v7.a;
					var y = _v7.b;
					return _Utils_Tuple2(
						_Utils_Tuple2(x, y),
						t);
				}),
			ls,
			A2(
				$elm$core$List$cons,
				endtype,
				_Utils_ap(
					typelist,
					_List_fromArray(
						[starttype])))));
	var _v2 = A2(
		$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
		seed1,
		_Utils_Tuple2(1, 4));
	var storeCnt = _v2.a;
	var seed2 = _v2.b;
	var ntypeMap = A3($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genStores, typeMap, seed2, storeCnt);
	var nbp2 = _Utils_update(
		nbp,
		{
			bh: end,
			bV: ls,
			cc: ntypeMap,
			cq: start,
			cw: A2(
				$elm$core$List$cons,
				endtype,
				_Utils_ap(
					typelist,
					_List_fromArray(
						[starttype])))
		});
	var stores = A2(
		$elm$core$List$map,
		function (_v3) {
			var row = _v3.a;
			var col = _v3.b;
			return _Utils_Tuple2(row, col);
		},
		A2(
			$elm$core$List$filter,
			function (_v4) {
				var flag = _v4.c;
				return flag;
			},
			$author$project$Lib$Tools$ArrayTools$array2D_flatten(
				A2(
					$tortus$elm_array_2d$Array2D$indexedMap,
					F3(
						function (row, col, room) {
							return _Utils_eq(room, -5) ? _Utils_Tuple3(row, col, true) : _Utils_Tuple3(row, col, false);
						}),
					ntypeMap))));
	return _Utils_Tuple2(
		env,
		_Utils_update(
			model,
			{
				aX: nbp2,
				bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading(1),
				cr: stores
			}));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GenTileMap = 2;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $tortus$elm_array_2d$Array2D$ArrayHelpers$minRowLength = function (array) {
	return $elm$core$Array$isEmpty(array) ? 0 : A3(
		$elm$core$Array$foldl,
		F2(
			function (row, min) {
				var rowLen = $elm$core$Array$length(row);
				return _Utils_eq(min, -1) ? rowLen : ((_Utils_cmp(rowLen, min) < 0) ? rowLen : min);
			}),
		-1,
		array);
};
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.d)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.d, tail);
		return (notAppended < 0) ? {
			e: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.e),
			c: builder.c + 1,
			d: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			e: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.e),
			c: builder.c + 1,
			d: $elm$core$Elm$JsArray$empty
		} : {e: builder.e, c: builder.c, d: appended});
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						e: _List_Nil,
						c: 0,
						d: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_v0.$) {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_v0.$) {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $tortus$elm_array_2d$Array2D$ArrayHelpers$truncateRows = F2(
	function (columns, array) {
		return A2(
			$elm$core$Array$map,
			function (row) {
				return (_Utils_cmp(
					$elm$core$Array$length(row),
					columns) > 0) ? A3($elm$core$Array$slice, 0, columns, row) : row;
			},
			array);
	});
var $tortus$elm_array_2d$Array2D$ArrayHelpers$getMinColumnsAndTruncateRows = function (array) {
	var columns = $tortus$elm_array_2d$Array2D$ArrayHelpers$minRowLength(array);
	var normalizedData = A2($tortus$elm_array_2d$Array2D$ArrayHelpers$truncateRows, columns, array);
	return _Utils_Tuple2(columns, normalizedData);
};
var $tortus$elm_array_2d$Array2D$fromArray = function (array) {
	var _v0 = $tortus$elm_array_2d$Array2D$ArrayHelpers$getMinColumnsAndTruncateRows(array);
	var initialColumns = _v0.a;
	var normalizedData = _v0.b;
	return {i: initialColumns, cV: normalizedData};
};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{e: nodeList, c: nodeListSize, d: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $tortus$elm_array_2d$Array2D$fromList = function (list) {
	return $tortus$elm_array_2d$Array2D$fromArray(
		$elm$core$Array$fromList(
			A2($elm$core$List$map, $elm$core$Array$fromList, list)));
};
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $tortus$elm_array_2d$Array2D$getColumnHelper = F3(
	function (column, items, data) {
		getColumnHelper:
		while (true) {
			if (data.b) {
				var head = data.a;
				var rest = data.b;
				var _v1 = A2($elm$core$Array$get, column, head);
				if (!_v1.$) {
					var item = _v1.a;
					var $temp$column = column,
						$temp$items = A2($elm$core$Array$push, item, items),
						$temp$data = rest;
					column = $temp$column;
					items = $temp$items;
					data = $temp$data;
					continue getColumnHelper;
				} else {
					return $elm$core$Maybe$Nothing;
				}
			} else {
				return $elm$core$Maybe$Just(items);
			}
		}
	});
var $tortus$elm_array_2d$Array2D$getColumn = F2(
	function (column, array2d) {
		return A3(
			$tortus$elm_array_2d$Array2D$getColumnHelper,
			column,
			$elm$core$Array$empty,
			$elm$core$Array$toList(array2d.cV));
	});
var $author$project$Lib$Tools$ArrayTools$transpose = function (arr) {
	return $tortus$elm_array_2d$Array2D$fromList(
		A2(
			$elm$core$List$map,
			function (i) {
				return $elm$core$Array$toList(
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Array$empty,
						A2($tortus$elm_array_2d$Array2D$getColumn, i, arr)));
			},
			A2(
				$elm$core$List$range,
				0,
				$tortus$elm_array_2d$Array2D$columns(arr) - 1)));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$labRooms = _List_fromArray(
	[
		{
		c$: _List_Nil,
		a: 0,
		dD: 0,
		dG: _Utils_Tuple2(0, 0),
		dT: A3($tortus$elm_array_2d$Array2D$repeat, 32, 32, 89),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(17, 18),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 7),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(20, 24),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(18, 13),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 0,
		dD: 1,
		dG: _Utils_Tuple2(16, 17),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 65, 67, 19, 29, 21, 23, 25, 21, 69, 71, 5, 17, 89, 89, 89, 65, 67, 89, 65, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 69, 71, 11, 2, 2, 2, 2, 2, 2, 2, 2, 43, 45, 47, 5, 69, 71, 29, 69, 71, 55, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[101, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 95, 89, 97]),
						_List_fromArray(
						[105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 69, 93, 71]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 91, 75, 21, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 97, 89, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 25, 2, 2, 2, 2, 2, 45, 47, 89, 89, 89, 89, 93, 79, 55, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 89, 89, 89, 89, 89, 43, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 89, 89, 89, 89, 89, 43, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 39, 41, 89, 89, 89, 35, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 57, 59, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 17, 89, 89, 89, 35, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 13, 95, 89, 89, 89, 89, 15, 43, 2, 2, 39, 41, 2, 2, 2, 49, 51, 2, 2, 2, 2, 31, 89, 65, 67, 11, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 5, 69, 71, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 85, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 41]),
						_List_fromArray(
						[2, 19, 37, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[39, 41, 13, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 21, 53, 27, 39, 41, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 17, 19, 55, 43, 35, 23, 25, 2, 2, 2, 2, 2, 2, 2, 2, 19]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 39, 41, 57, 59, 55]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 57, 59, 57, 59, 57, 59, 21, 21, 21, 19, 3, 57, 59, 43, 37, 89, 89, 61, 63, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 63, 61, 63, 61, 63, 89, 89, 89, 89, 89, 61, 63, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(7, 13),
				_Utils_Tuple2(19, 26)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(25, 12),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(25, 20),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(5, 20),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(7, 13),
				4,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 1,
		dD: 1,
		dG: _Utils_Tuple2(16, 12),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[65, 89, 89, 67, 95, 89, 97, 65, 89, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 67, 95, 67]),
						_List_fromArray(
						[69, 93, 93, 71, 69, 93, 71, 69, 93, 71, 29, 21, 5, 5, 39, 99, 99, 99, 41, 43, 45, 47, 55, 23, 25, 5, 5, 69, 93, 71, 69, 71]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 23, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 39, 99, 99, 99, 41, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 13, 81, 91, 75, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 59, 85, 93, 79, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 69, 71, 11, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 59, 57, 59, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 61, 63, 61, 63, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[3, 19, 19, 27, 27, 21, 23, 25, 57, 59, 101, 39, 41, 89, 89, 89, 89, 15, 53, 57, 91, 59, 43, 57, 91, 59, 57, 91, 59, 57, 91, 59]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 61, 63, 105, 89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 63, 89, 61, 89, 63, 61, 89, 63, 61, 89, 63]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(15, 18)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(10, 10),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(12, 15),
				6,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(21, 21),
				4,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(28, 18),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(22, 10),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 2,
		dD: 1,
		dG: _Utils_Tuple2(16, 8),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 89, 89, 67, 65, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 69, 93, 93, 93, 71, 69, 71, 55, 55, 45, 47, 55, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 55, 77, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 55, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 55, 57, 91, 59, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 65, 89, 89, 89, 93, 93, 79, 19, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 29, 69, 93, 71, 39, 99, 99, 41]),
						_List_fromArray(
						[39, 41, 69, 93, 93, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 45, 47, 81, 91, 91, 75, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 49, 51, 85, 93, 93, 79, 57, 59, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 43, 45, 47, 55, 37, 35, 2, 2, 2, 2, 2, 2, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[39, 41, 91, 59, 55, 49, 51, 43, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 91, 91, 91, 75]),
						_List_fromArray(
						[69, 93, 93, 79, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 93, 93, 93, 79]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 25, 39, 41, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 105, 39, 99, 99, 99, 41, 2, 2, 2, 2, 2, 101, 45, 47, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 27, 27, 57, 91, 91, 59, 57, 91, 59, 103, 49, 51, 57, 59, 21, 55, 55, 13, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 89, 63, 61, 89, 63, 105, 89, 89, 95, 97, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 63, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(9, 6)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(11, 20),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(16, 15),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(15, 4),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(29, 12),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(22, 4),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 0,
		dD: 2,
		dG: _Utils_Tuple2(22, 4),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 45, 47, 45, 47, 45, 47, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 49, 51, 49, 51, 49, 51, 101, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 57, 91, 91, 59, 2, 2, 2, 2, 2, 39, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 103, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 69, 93, 93, 71, 43, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 21, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 57, 59, 21, 2, 2, 2, 2, 45, 47, 55, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 69, 71, 2, 2, 2, 2, 2, 49, 51, 43, 2, 2, 2, 2, 2, 2, 43, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 19, 19, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 35, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 35, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 15, 2, 2, 2, 2, 2, 2, 21, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 37, 21, 35, 2, 2, 2, 2, 2, 55, 19, 103, 89, 89, 39, 41, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 33, 11, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 89, 9, 2, 2, 2, 2, 31, 7, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 33, 2, 2, 2, 2, 2, 2, 43, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 9, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 15, 45, 47, 2, 2, 2, 2, 2, 39, 99, 41, 2, 2, 2, 21, 89, 35, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 11, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 73, 75, 2, 2, 2, 2, 55, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 101, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 77, 79, 2, 2, 2, 81, 83, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 65, 67, 11, 2, 2, 2, 2, 95, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 71, 2, 2, 2, 2, 2, 95, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 85, 87, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 13, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 91, 91, 59, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 61, 89, 89, 63, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 39, 41, 2, 2, 2, 23, 19, 19, 25, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(25, 18),
				_Utils_Tuple2(23, 6)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(14, 4),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(9, 9),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 26),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(7, 29),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 1,
		dD: 2,
		dG: _Utils_Tuple2(14, 4),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 39, 99, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 49, 51, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 21, 23, 25, 21, 43, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 77, 79, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 55, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 57, 91, 59, 27, 27, 19, 3, 21, 2, 2, 2, 2, 57, 59, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 61, 89, 63, 89, 89, 89, 11, 35, 2, 2, 2, 37, 61, 63, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 11, 21, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 89, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 89, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 55, 55, 35, 2, 2, 89, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 89, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 89, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 89, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 65, 67, 65, 67, 89, 89, 11, 2, 2, 2, 2, 39, 41, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 69, 71, 69, 71, 45, 47, 2, 2, 2, 2, 55, 65, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 73, 75, 43, 89, 89, 2, 49, 51, 2, 2, 2, 2, 2, 69, 71, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 97, 89, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 55, 39, 99, 41, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 37, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 7, 39, 99, 99, 41, 9, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 73, 75, 39, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 19, 55, 19, 37, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(24, 30),
				_Utils_Tuple2(21, 1)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(14, 5),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 6),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(8, 17),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 21),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(16, 29),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 13),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 2,
		dD: 2,
		dG: _Utils_Tuple2(13, 11),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 29, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 39, 41, 2, 2, 2, 2, 2, 2, 2, 7, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 15, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 41, 2, 2, 31, 17, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 91, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 15, 57, 59, 39, 99, 99, 99, 99, 41, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 95, 97, 13, 2, 2, 2, 2, 15, 101, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 11, 21, 21, 19, 69, 71, 2, 2, 2, 2, 2, 2, 103, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 2, 2, 2, 2, 2, 2, 31, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 2, 2, 45, 47, 2, 2, 31, 101, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 67, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 97, 2, 2, 2, 2, 2, 45, 47, 39, 41, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 79, 2, 2, 2, 2, 2, 49, 51, 89, 89, 49, 51, 57, 59, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 19, 19, 2, 2, 2, 2, 21, 89, 89, 89, 89, 61, 63, 2, 2, 2, 2, 2, 2, 81, 83, 105, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 2, 89, 101, 2, 2, 2, 2, 2, 2, 21, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 85, 93, 87, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 21, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 37, 13, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 17, 89, 11, 2, 2, 2, 2, 2, 2, 37, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 103, 2, 2, 57, 91, 59, 2, 2, 2, 15, 5, 13, 2, 2, 2, 2, 2, 21, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2]),
						_List_fromArray(
						[89, 89, 89, 103, 2, 2, 69, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 39, 99, 99, 99, 41, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 49, 51, 21, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 39, 99, 41, 2, 2, 2, 2, 2, 2, 81, 91, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 21, 39, 41, 2, 2, 2, 2, 29, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 11, 29, 2, 2, 2, 2, 2, 2, 2, 2, 29, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 11, 29, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 29, 2, 2, 2, 2, 2, 2, 2, 19, 19, 19, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(4, 13)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(25, 14),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 23),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(12, 9),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(1, 11),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(10, 17),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0))
			]),
		a: 0,
		dD: 3,
		dG: _Utils_Tuple2(25, 14),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 37, 35, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 13, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 65, 67, 89, 43, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 21, 49, 51, 65, 89, 67, 89, 89, 89, 65, 89, 67, 89, 89]),
						_List_fromArray(
						[29, 19, 69, 71, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 93, 71, 5, 29, 5, 69, 93, 71, 101, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 55]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 57, 59, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 71, 81, 91, 91, 75, 2, 2, 2, 2, 23, 25, 2, 2, 2, 2, 2, 2, 2, 45, 47]),
						_List_fromArray(
						[81, 59, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 17, 85, 93, 93, 79, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51]),
						_List_fromArray(
						[85, 71, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 99, 99, 41, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 55, 53, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 57, 91, 59, 57, 91, 59, 57, 91, 59, 21, 89, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[27, 55, 21, 23, 25, 21, 19, 61, 89, 63, 61, 89, 63, 61, 89, 63, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 85, 87]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 3, 57, 91, 59, 57, 91, 59, 57, 91, 59, 19, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 63, 61, 89, 63, 61, 89, 63, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(18, 6),
				_Utils_Tuple2(4, 20)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(2, 14),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(3, 23),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(9, 22),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(17, 9),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(18, 4),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 1,
		dD: 3,
		dG: _Utils_Tuple2(8, 16),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21, 89, 65, 67, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 69, 71, 17, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 57, 59, 57, 59, 2, 2, 2, 2, 2, 2, 29, 2, 2, 21, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 69, 93, 93, 71, 55, 55, 2, 2, 2, 2, 2, 2, 2, 81, 75, 89, 89, 89, 89]),
						_List_fromArray(
						[65, 67, 65, 67, 89, 89, 89, 89, 89, 45, 47, 39, 99, 99, 41, 2, 2, 2, 89, 21, 33, 2, 2, 2, 2, 2, 95, 79, 89, 89, 89, 89]),
						_List_fromArray(
						[69, 71, 69, 71, 89, 89, 89, 73, 75, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 33, 2, 2, 2, 2, 2, 95, 75, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 5, 89, 89, 93, 93, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 27, 2, 2, 2, 2, 85, 79, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 5, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 45, 47, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 5, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 27, 39, 41, 2, 2, 2, 2, 2, 2, 2, 55, 49, 51, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 19, 19, 2, 2, 2, 2, 2, 2, 2, 3, 13, 89, 15, 21, 2, 2, 2, 2, 2, 55, 55, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 31, 89, 89, 89, 15, 21, 2, 2, 2, 2, 2, 21, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 19, 45, 47, 101, 89, 89, 89, 2, 3, 19, 2, 2, 2, 2, 21, 17, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 101, 2, 2, 2, 2, 2, 2, 49, 51, 103, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 39, 41, 2, 2, 103, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 105, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 2, 15, 9, 57, 59, 39, 41, 45, 47, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 21, 21, 3, 57, 59, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 15, 61, 63, 89, 89, 49, 51, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 19, 2, 2, 61, 63, 21, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 2]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[3, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 59, 37, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 103, 2, 2, 2, 2, 2, 37, 53, 53, 53, 61, 63, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 105, 39, 99, 99, 99, 41, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(20, 5)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(10, 6),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(4, 22),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(8, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(19, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(19, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(19, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(26, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(26, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(26, 22),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 22),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 22),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 22),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0))
			]),
		a: 2,
		dD: 3,
		dG: _Utils_Tuple2(21, 7),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89, 65, 67, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 101, 69, 71, 17, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 65, 89, 67, 103, 2, 2, 81, 83, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 77, 79, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 93, 71, 105, 2, 2, 85, 87, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[45, 47, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89]),
						_List_fromArray(
						[49, 51, 17, 65, 89, 89, 67, 11, 39, 99, 99, 41, 55, 55, 2, 2, 2, 2, 2, 2, 2, 23, 25, 2, 2, 2, 39, 99, 41, 83, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 69, 93, 93, 71, 55, 29, 5, 29, 5, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 85, 87, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 55, 101, 2, 2, 2, 2, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 85, 87, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 103, 2, 2, 2, 81, 75, 39, 99, 41, 2, 2, 2, 2, 19, 43, 105, 31, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 103, 2, 2, 2, 85, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 13, 89, 103, 2, 2, 2, 2, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 49, 51, 2, 2, 2, 2, 39, 41, 89, 89, 105, 2, 2, 2, 2, 103, 2, 2, 45, 45, 45, 47, 45, 47, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 31, 89, 35, 2, 2, 2, 2, 103, 2, 2, 45, 49, 49, 45, 47, 51, 2, 2, 43, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 89, 35, 2, 2, 2, 2, 103, 2, 2, 45, 47, 45, 47, 47, 47, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89, 39, 41, 2, 2, 2, 103, 2, 2, 49, 45, 49, 51, 51, 51, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 93, 71, 55, 2, 2, 2, 105, 2, 2, 49, 49, 51, 49, 51, 47, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[39, 41, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 2, 2, 49, 51, 49, 51, 51, 51, 2, 2, 23, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 105, 57, 91, 91, 59, 57, 91, 91, 59, 57, 59, 57, 91, 91, 59, 105, 57, 59, 57, 91, 91, 59, 57, 91, 91, 59, 13, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 61, 89, 89, 63, 61, 89, 89, 63, 61, 63, 61, 89, 89, 63, 89, 61, 63, 61, 89, 89, 63, 61, 89, 89, 63, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(26, 7)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(13, 23),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(22, 23),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(15, 7),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 12),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 0,
		dD: 4,
		dG: _Utils_Tuple2(24, 12),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 39, 41, 19, 39, 41, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 59, 21, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 71, 23, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 25, 89, 89, 89, 45, 47, 65, 89, 67, 65, 67, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 91, 59, 55, 49, 51, 69, 93, 71, 69, 71, 101]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 103]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 105]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 57, 59, 57, 59, 57, 59, 55, 43, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 13, 61, 63, 61, 63, 61, 63, 89, 15, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 19, 21, 23, 9, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 17, 65, 67, 65, 67, 65, 67, 65, 67, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 69, 71, 69, 71, 69, 71, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 55, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 99, 41]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 57, 91, 91, 59, 27, 21, 19, 55, 57, 91, 91, 59, 57, 59, 57, 59, 57, 91, 91, 59, 13, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 89, 63, 89, 89, 89, 89, 61, 89, 89, 63, 61, 63, 61, 63, 61, 89, 89, 63, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(19, 3),
				_Utils_Tuple2(21, 26)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(15, 7),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(21, 7),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(21, 7),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(7, 15),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(7, 15),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(15, 23),
				6,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(20, 23),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 23),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0))
			]),
		a: 1,
		dD: 4,
		dG: _Utils_Tuple2(9, 7),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 95, 89, 89, 89, 67, 65, 67, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 93, 93, 93, 71, 69, 71, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 57, 59, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 95, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 57, 59, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 13, 85, 71, 23, 39, 99, 99, 41, 57, 91, 91, 91, 59, 2, 2, 2, 2, 2, 37, 65, 89, 67]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 57, 91, 59, 11, 2, 2, 2, 2, 2, 7, 95, 89, 89, 89, 63, 15, 2, 2, 2, 2, 2, 69, 93, 71]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 29, 5, 29, 69, 93, 71, 2, 2, 2, 2, 2, 2, 31, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 95, 89, 89, 89, 67, 11, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 93, 93, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 41, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 105, 57, 91, 75, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 61, 89, 63, 49, 51, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 91, 59]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 61, 89, 63]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 57, 59, 57, 91, 91, 91, 59, 27, 57, 91, 91, 59, 57, 91, 91, 91, 59, 105, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 63, 95, 89, 89, 89, 63, 89, 61, 89, 89, 63, 95, 89, 89, 89, 63, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(7, 16)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(23, 15),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(16, 9),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 3),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(10, 5),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 2,
		dD: 4,
		dG: _Utils_Tuple2(30, 13),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 39, 41, 2, 2, 21, 17, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21, 89, 65, 67, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 69, 71, 17, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 57, 59, 57, 59, 2, 2, 2, 2, 2, 2, 29, 2, 2, 21, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 69, 93, 93, 71, 55, 55, 2, 2, 2, 2, 2, 2, 2, 81, 75, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 39, 99, 99, 41, 2, 2, 2, 89, 21, 33, 2, 2, 2, 2, 2, 95, 79, 65, 89, 89, 67]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 33, 2, 2, 2, 2, 2, 95, 75, 69, 93, 93, 71]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 27, 2, 2, 2, 2, 85, 79, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 2, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 45, 47, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 2, 105, 2, 2, 2, 2, 2, 27, 39, 41, 2, 2, 2, 2, 2, 2, 2, 55, 49, 51, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 2, 35, 2, 2, 2, 2, 3, 13, 89, 15, 21, 2, 2, 2, 2, 2, 55, 55, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 2, 39, 99, 99, 99, 41, 31, 89, 89, 89, 15, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 3, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 53, 53]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 2, 15, 9, 57, 59, 39, 41, 45, 47, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 15, 61, 63, 89, 89, 49, 51, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 15, 35, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 2, 89, 89, 89, 89, 89, 89, 15, 21, 39, 41]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(11, 11)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(26, 6),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(27, 12),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(15, 28),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(16, 22),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 0,
		dD: 5,
		dG: _Utils_Tuple2(26, 6),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 45, 47, 65, 67, 65, 67, 45, 47, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 9, 69, 71, 49, 51, 69, 71, 69, 71, 49, 51, 101, 19, 17]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 2, 37]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[65, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 39, 41, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[69, 71, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55]),
						_List_fromArray(
						[2, 17, 57, 59, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 7, 9, 2, 2, 2, 43]),
						_List_fromArray(
						[2, 2, 69, 71, 55, 39, 99, 99, 99, 99, 41, 43, 39, 99, 99, 99, 99, 41, 49, 51, 43, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 27, 19, 21, 19, 57, 91, 59, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 81, 91, 75, 2, 2, 2, 2, 2, 2, 2, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 37, 89, 89, 89, 61, 89, 63, 57, 91, 91, 93, 75, 35, 2, 2, 2, 2, 85, 93, 79, 27, 3, 27, 3, 3, 55, 53, 89]),
						_List_fromArray(
						[2, 2, 2, 89, 37, 89, 89, 89, 89, 89, 89, 61, 89, 89, 89, 23, 2, 2, 2, 2, 101, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 25, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 81, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 23, 2, 2, 2, 43, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 85, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 25, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[57, 59, 13, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[61, 63, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 23, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 25, 21, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 89, 65, 67, 101, 9, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 69, 71, 21, 69, 71, 105, 2, 2, 2, 2, 39, 41, 17, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 73, 75, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 37, 19, 55, 35, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(22, 6)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(8, 16),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(16, 16),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 27),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(15, 27),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 12),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 1,
		dD: 5,
		dG: _Utils_Tuple2(25, 10),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 67, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 65, 67, 89, 89, 89, 89, 65, 89, 89, 67, 39, 99, 99, 99, 41, 45, 47, 5, 5, 45, 47, 69, 93, 79, 17, 89, 89]),
						_List_fromArray(
						[65, 89, 89, 67, 5, 69, 71, 29, 39, 99, 41, 69, 93, 93, 71, 2, 2, 2, 2, 2, 49, 51, 2, 2, 49, 51, 2, 2, 2, 81, 83, 89]),
						_List_fromArray(
						[69, 93, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 39, 99, 41, 23, 25, 2, 2, 2, 7, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 39, 99, 99, 41, 2, 2, 2, 2, 39, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 19, 17]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 89, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 89, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 89, 37]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 57, 59, 89]),
						_List_fromArray(
						[57, 91, 91, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 61, 63, 89]),
						_List_fromArray(
						[95, 89, 89, 89, 53, 57, 91, 59, 43, 57, 91, 59, 57, 59, 43, 21, 21, 57, 59, 101, 57, 59, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 61, 89, 63, 89, 61, 89, 63, 61, 63, 59, 2, 2, 69, 71, 105, 69, 71, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 101, 39, 99, 41, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 31, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 57, 91, 91, 59, 21, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 61, 89, 89, 63, 15, 21, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 41, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(29, 17)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(15, 26),
				4,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 12),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(25, 27),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0))
			]),
		a: 0,
		dD: 6,
		dG: _Utils_Tuple2(23, 21),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 89, 101]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 11, 39, 99, 99, 41, 45, 47, 5, 5, 69, 71, 19, 105]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 43, 2, 2, 2, 2, 49, 51, 11, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 23, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 31, 19, 21, 9, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 17, 29, 29, 11, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 65, 89, 67, 65, 89, 67, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 69, 71, 69, 93, 71, 69, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 19]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 19, 2, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 75, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 79, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 39, 99, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 27, 27, 21, 3, 3, 19, 27, 21, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 11, 43, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(29, 29),
				_Utils_Tuple2(23, 23)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(14, 5),
				5,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(21, 6),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(28, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(20, 13),
				4,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1))
			]),
		a: 1,
		dD: 6,
		dG: _Utils_Tuple2(18, 23),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 89, 67, 89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 89, 67, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 69, 93, 93, 71, 21, 19, 21, 29, 29, 5, 29, 29, 95, 89, 89, 97, 45, 47, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 93, 93, 71, 49, 51, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 79, 2, 2, 2, 39, 99, 99, 41, 57, 59, 15, 2, 2, 2, 2, 2, 2, 2, 2, 19, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 2, 2, 2, 85, 71, 57, 91, 91, 59, 15, 2, 2, 2, 2, 19, 65, 89, 89, 67]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 25, 2, 2, 2, 2, 2, 2, 2, 2, 17, 85, 93, 93, 71, 57, 59, 2, 2, 2, 2, 69, 93, 93, 71]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 21, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 85, 71, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 21, 23, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 57, 59, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 39, 99, 99, 41, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 91, 91, 59, 3, 27, 27, 3, 27, 27, 3]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 61, 89, 89, 63, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 13, 81, 91, 91, 75, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 57, 59, 85, 93, 93, 79, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 33, 2, 2, 2, 2, 2, 2, 85, 71, 11, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 9, 81, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 33, 85, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 21, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_fromArray(
			[
				_Utils_Tuple2(9, 10)
			])
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(13, 23),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(19, 10),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 4),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 0,
		dD: -1,
		dG: _Utils_Tuple2(24, 20),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 9, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 99, 41, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 81, 91, 91, 75, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 57, 91, 59, 93, 93, 79, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 69, 93, 71, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 45, 47, 45, 47, 65, 67, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 49, 51, 19, 21, 2, 2, 2, 2, 2, 23, 25, 49, 51, 49, 51, 49, 51, 69, 71, 19, 5, 29, 5, 45, 47, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 5, 5, 11, 2, 2, 2, 2, 2, 2, 2, 49, 51, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 43, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 39, 99, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 19, 25, 2, 2, 2, 2, 43, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 105, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 105, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 21, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 19, 3, 3, 21, 27, 57, 59, 39, 41, 55, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 89, 63, 61, 89, 89, 63, 61, 89, 89, 63, 89, 89, 89, 89, 89, 61, 63, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(25, 18),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 0,
		dD: -2,
		dG: _Utils_Tuple2(21, 9),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 89, 67, 65, 89, 89, 67, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 69, 93, 93, 71, 69, 93, 93, 71, 43, 45, 47, 29, 5, 19]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 11, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 11, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 23, 21, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 53, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 3, 27, 3, 21, 55, 39, 99, 99, 41, 19, 57, 59, 21, 3]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 63, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(8, 4),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 26),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0))
			]),
		a: 0,
		dD: -3,
		dG: _Utils_Tuple2(27, 4),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 39, 99, 41, 55, 43, 39, 99, 41, 55, 43, 39, 99, 41, 55, 43, 39, 99, 41, 55, 43, 39, 99, 41, 55, 43, 39, 99, 41, 17, 89]),
						_List_fromArray(
						[89, 45, 47, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89]),
						_List_fromArray(
						[73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89]),
						_List_fromArray(
						[77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[89, 89, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 19, 3, 3, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 59, 3, 89, 89]),
						_List_fromArray(
						[89, 89, 61, 89, 89, 63, 61, 89, 89, 63, 61, 89, 89, 63, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 13, 61, 63, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 55, 77, 79, 9, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 11, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 43, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 45, 47, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 49, 51, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 39, 41, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 65, 89, 67, 65, 89, 67, 65, 67, 21, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 11, 69, 93, 71, 69, 93, 71, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 49, 51, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 23, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 27, 57, 59, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 25, 2, 21, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 61, 63, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 101, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 81, 91, 91, 75, 2, 2, 2, 2, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 55, 2, 2, 2, 2, 2, 85, 93, 93, 79, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_Nil,
		a: 0,
		dD: -4,
		dG: _Utils_Tuple2(10, 11),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[65, 89, 67, 65, 89, 89, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[69, 93, 71, 69, 93, 93, 71, 19, 89, 89, 89, 101, 19, 21, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 17, 45, 47, 43, 105, 2, 17, 19, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 21, 25, 2, 2, 55, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 57, 59, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 105, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 85, 87, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 57, 59, 27, 39, 99, 99, 99, 41, 43, 57, 59, 21, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 61, 63, 89, 89, 89, 89, 89, 89, 89, 61, 63, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_Nil,
		a: 0,
		dD: -5,
		dG: _Utils_Tuple2(14, 21),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 65, 67, 65, 67, 89, 89, 89, 89, 45, 47, 89, 89, 89, 89, 89, 89, 101, 65, 67, 65, 67, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 69, 71, 69, 71, 39, 99, 99, 41, 49, 51, 19, 5, 5, 19, 29, 55, 105, 69, 71, 69, 71, 43, 45, 47, 55, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 73, 75, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 55, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 85, 87, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 23, 25, 3, 3, 21, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 27, 19, 3, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 89, 63, 61, 89, 89, 63, 61, 89, 89, 63, 61, 89, 89, 63, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(24, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(20, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(16, 17),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(14, 17),
				2,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(12, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(7, 17),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1))
			]),
		a: 1,
		dD: -1,
		dG: _Utils_Tuple2(7, 13),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 65, 67, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 11, 29, 5, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 17, 65, 67, 11, 29, 69, 71, 17, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 39, 99, 41, 2, 2, 2, 2, 2, 2, 2, 2, 69, 71, 2, 2, 2, 2, 81, 83, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 25, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 25, 2, 2, 2, 2, 23, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 41, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 103, 2, 2, 2, 23, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89]),
						_List_fromArray(
						[89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 15, 57, 91, 59, 19, 27, 27, 53, 53, 27, 27, 3, 3, 39, 99, 99, 41, 57, 59, 57, 91, 91, 59, 27, 27, 13, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 61, 89, 63, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 63, 61, 89, 89, 63, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(7, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(10, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(12, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(18, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(21, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 17),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(8, 6),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(13, 5),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(22, 6),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1))
			]),
		a: 1,
		dD: -2,
		dG: _Utils_Tuple2(30, 17),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 65, 67, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 65, 67, 21, 21, 29, 29, 19, 21, 69, 71, 5, 65, 89, 89, 67, 17, 89, 89, 11, 29, 29, 29, 17, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 11, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 69, 93, 93, 71, 39, 99, 99, 41, 2, 2, 2, 31, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 25, 2, 2, 2, 2, 2, 2, 2, 13, 3, 27, 27, 21, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89, 65, 89, 67]),
						_List_fromArray(
						[89, 89, 89, 89, 35, 2, 2, 39, 99, 99, 41, 81, 83, 89, 89, 89, 89, 89, 89, 35, 19, 19, 55, 45, 47, 2, 2, 2, 19, 69, 93, 71]),
						_List_fromArray(
						[89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 49, 51, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 17, 29, 29, 5, 5, 5, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 19, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 41, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 77, 79, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 2, 2]),
						_List_fromArray(
						[89, 89, 89, 89, 15, 57, 91, 91, 59, 27, 27, 39, 99, 41, 53, 89, 27, 45, 47, 57, 91, 59, 57, 91, 91, 59, 27, 27, 49, 51, 57, 59]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 61, 89, 89, 63, 89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 61, 89, 63, 61, 89, 89, 63, 89, 89, 89, 89, 61, 63]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(7, 18),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(9, 12),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(11, 4),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(17, 13),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(20, 8),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 8),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(24, 21),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(23, 21),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(1)),
				_Utils_Tuple3(
				_Utils_Tuple2(22, 21),
				1,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0))
			]),
		a: 1,
		dD: -3,
		dG: _Utils_Tuple2(23, 27),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 65, 89, 89, 89, 67, 65, 89, 89, 89, 89, 89, 89, 65, 89, 89, 89, 89, 89, 89, 67, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 11, 69, 93, 93, 93, 71, 69, 93, 93, 93, 93, 93, 71, 69, 93, 93, 93, 93, 93, 93, 71, 17, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 51, 49, 81, 83, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 51, 51, 2, 2, 45, 45, 51, 45, 2, 2, 49, 2, 2, 2, 2, 2, 2, 47, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 47, 49, 51, 51, 45, 2, 2, 2, 2, 2, 47, 2, 45, 2, 45, 2, 2, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 77, 79, 2, 2, 49, 47, 2, 2, 51, 51, 45, 2, 2, 2, 2, 2, 2, 2, 47, 2, 2, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 73, 75, 2, 2, 49, 45, 51, 2, 45, 45, 47, 47, 2, 2, 2, 2, 2, 2, 49, 2, 2, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 49, 51, 47, 45, 47, 49, 51, 51, 2, 2, 2, 2, 2, 45, 2, 2, 2, 85, 87, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 49, 51, 49, 51, 49, 45, 2, 2, 2, 2, 47, 49, 2, 2, 2, 81, 83, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 45, 49, 45, 2, 2, 2, 2, 45, 45, 2, 2, 2, 45, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 47, 51, 2, 2, 2, 51, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 51, 2, 2, 2, 45, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 49, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 2, 85, 87, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 51, 51, 2, 2, 2, 51, 47, 49, 49, 2, 2, 2, 2, 2, 2, 2, 45, 51, 81, 83, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 79, 2, 2, 2, 45, 2, 2, 2, 2, 2, 2, 47, 47, 45, 2, 2, 49, 2, 2, 49, 49, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 73, 75, 2, 2, 2, 2, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 2, 2, 2, 2, 45, 47, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 47, 49, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 47, 45, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 97, 47, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 77, 79, 47, 51, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 15, 57, 91, 91, 91, 91, 91, 59, 2, 2, 2, 2, 91, 91, 59, 57, 91, 91, 91, 91, 59, 13, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 69, 93, 93, 93, 93, 93, 71, 2, 2, 2, 2, 93, 93, 71, 69, 93, 93, 93, 93, 71, 17, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 41, 29, 17, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 45, 47, 45, 47, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 49, 51, 49, 51, 49, 51, 2, 2, 21, 27, 45, 47, 45, 47, 45, 47, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 35, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 49, 51, 49, 51, 49, 51, 37, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 19, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	},
		{
		c$: _List_fromArray(
			[
				_Utils_Tuple3(
				_Utils_Tuple2(4, 18),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(0)),
				_Utils_Tuple3(
				_Utils_Tuple2(22, 24),
				3,
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyDash(0))
			]),
		a: 1,
		dD: -4,
		dG: _Utils_Tuple2(15, 10),
		dT: $author$project$Lib$Tools$ArrayTools$transpose(
			$tortus$elm_array_2d$Array2D$fromList(
				_List_fromArray(
					[
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 11, 39, 99, 99, 99, 41, 43, 45, 47, 55, 89, 89, 89, 89, 65, 67, 89, 89, 89, 45, 47, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 65, 67, 45, 47, 2, 2, 2, 2, 2, 2, 49, 51, 2, 21, 21, 5, 5, 69, 71, 29, 21, 5, 49, 51, 101, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 101, 69, 71, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 19, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 45, 47, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 49, 51, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 89]),
						_List_fromArray(
						[89, 65, 89, 89, 67, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89]),
						_List_fromArray(
						[19, 69, 93, 93, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 103, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 75, 2, 2, 2, 2, 2, 103, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 101, 69, 71, 2, 2, 2, 2, 2, 105, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 23, 103, 2, 2, 2, 2, 2, 2, 81, 83, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 99, 41, 3, 27, 45, 47, 3, 25, 19, 103, 2, 2, 2, 2, 2, 2, 85, 87, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 39, 99, 41, 81, 83, 89, 89, 89, 89, 65, 49, 51, 67, 73, 75, 103, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 85, 87, 65, 67, 5, 29, 69, 93, 93, 71, 93, 79, 105, 2, 2, 2, 2, 2, 2, 2, 37, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 11, 2, 69, 71, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 43, 89, 89, 33, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 89]),
						_List_fromArray(
						[2, 2, 2, 2, 2, 2, 2, 37, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 31, 89]),
						_List_fromArray(
						[27, 27, 53, 57, 91, 91, 59, 37, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 39, 99, 41, 89]),
						_List_fromArray(
						[89, 89, 89, 61, 89, 89, 63, 13, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 57, 59, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 103, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 61, 63, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 105, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 81, 83, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 95, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 85, 87, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 45, 47, 2, 2, 2, 2, 2, 2, 2, 2, 101, 57, 91, 91, 59, 13, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 49, 51, 2, 2, 2, 2, 2, 2, 2, 2, 103, 61, 89, 89, 63, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 57, 91, 91, 59, 3, 27, 27, 3, 105, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 61, 89, 89, 63, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89]),
						_List_fromArray(
						[89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89])
					]))),
		dY: _List_Nil
	}
	]);
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$nullRoom = {
	c$: _List_Nil,
	a: 0,
	dD: 0,
	dG: _Utils_Tuple2(0, 0),
	dT: A3($tortus$elm_array_2d$Array2D$repeat, 32, 32, 89),
	dY: _List_Nil
};
var $author$project$Lib$Tools$ArrayTools$array2D_slice = F3(
	function (_v0, _v1, array) {
		var x1_ = _v0.a;
		var y1_ = _v0.b;
		var x2_ = _v1.a;
		var y2_ = _v1.b;
		if ($tortus$elm_array_2d$Array2D$isEmpty(array)) {
			return array;
		} else {
			var _v2 = A3($tortus$elm_array_2d$Array2D$get, 0, 0, array);
			if (_v2.$ === 1) {
				return array;
			} else {
				var defaultEle = _v2.a;
				var y1 = A2($elm$core$Basics$max, 0, y1_);
				var x1 = A2($elm$core$Basics$max, 0, x1_);
				var f = F2(
					function (x, y) {
						return A2(
							$elm$core$Maybe$withDefault,
							defaultEle,
							A3($tortus$elm_array_2d$Array2D$get, x + x1, y + y1, array));
					});
				var _v3 = _Utils_Tuple2(
					$tortus$elm_array_2d$Array2D$rows(array),
					$tortus$elm_array_2d$Array2D$columns(array));
				var r = _v3.a;
				var c = _v3.b;
				var y2 = A2($elm$core$Basics$min, c - 1, y2_);
				var h = (y2 - y1) + 1;
				var x2 = A2($elm$core$Basics$min, r - 1, x2_);
				var w = (x2 - x1) + 1;
				var slice = A3($tortus$elm_array_2d$Array2D$repeat, w, h, defaultEle);
				return A2(
					$tortus$elm_array_2d$Array2D$indexedMap,
					F3(
						function (i, j, _v4) {
							return A2(f, i, j);
						}),
					slice);
			}
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$smallestMap = F2(
	function (arr, ls) {
		var miny = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(
				A2(
					$elm$core$List$map,
					function (_v3) {
						var y = _v3.b;
						return y;
					},
					ls)));
		var minx = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(
				A2(
					$elm$core$List$map,
					function (_v2) {
						var x = _v2.a;
						return x;
					},
					ls)));
		var maxy = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$maximum(
				A2(
					$elm$core$List$map,
					function (_v1) {
						var y = _v1.b;
						return y;
					},
					ls)));
		var maxx = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$maximum(
				A2(
					$elm$core$List$map,
					function (_v0) {
						var x = _v0.a;
						return x;
					},
					ls)));
		return _Utils_Tuple3(
			A3(
				$author$project$Lib$Tools$ArrayTools$array2D_slice,
				_Utils_Tuple2(minx, miny),
				_Utils_Tuple2(maxx, maxy),
				arr),
			_Utils_Tuple2(minx, miny),
			_Utils_Tuple2(maxx, maxy));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genRoom = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var bp = model.aX;
	var _v1 = A2(
		$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$smallestMap,
		bp.cc,
		_Utils_ap(bp.bV, model.cr));
	var smallest = _v1.a;
	var tl = _v1.b;
	var br = _v1.c;
	var initMap = A2(
		$tortus$elm_array_2d$Array2D$indexedMap,
		F3(
			function (r, c, a) {
				var validRooms = A2(
					$elm$core$List$filter,
					function (roomtp) {
						return _Utils_eq(roomtp.dD, a);
					},
					$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$labRooms);
				var seed = (r * 10) + c;
				var random = A2(
					$author$project$Lib$Tools$RNG$genRandomInt,
					seed,
					_Utils_Tuple2(0, 100));
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$nullRoom,
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						A2(
							$elm$core$Basics$modBy,
							$elm$core$List$length(validRooms),
							random),
						validRooms));
			}),
		smallest);
	var startInSmallest = _Utils_Tuple2(bp.cq.a - tl.a, bp.cq.b - tl.b);
	var spawn = A2(
		$elm$core$Maybe$withDefault,
		$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$nullRoom,
		A3($tortus$elm_array_2d$Array2D$get, startInSmallest.a, startInSmallest.b, initMap)).dG;
	var storesInSmallest = A2(
		$elm$core$List$map,
		function (_v2) {
			var x = _v2.a;
			var y = _v2.b;
			return _Utils_Tuple2(x - tl.a, y - tl.b);
		},
		model.cr);
	return _Utils_Tuple2(
		env,
		_Utils_update(
			model,
			{
				bH: initMap,
				bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading(2),
				cm: smallest,
				cn: _Utils_Tuple2(startInSmallest, spawn),
				cr: storesInSmallest
			}));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GenPlayer = 3;
var $author$project$Lib$Tools$ArrayTools$array2D_flatten_column = function (arr) {
	return $elm$core$List$concat(
		A2(
			$elm$core$List$map,
			function (i) {
				return $elm$core$Array$toList(
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Array$empty,
						A2($tortus$elm_array_2d$Array2D$getColumn, i, arr)));
			},
			A2(
				$elm$core$List$range,
				0,
				$tortus$elm_array_2d$Array2D$columns(arr) - 1)));
};
var $elm_community$list_extra$List$Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _v0) {
				var i = _v0.a;
				var thisAcc = _v0.b;
				return _Utils_Tuple2(
					i + 1,
					A3(func, i, x, thisAcc));
			});
		return A3(
			$elm$core$List$foldl,
			step,
			_Utils_Tuple2(0, acc),
			list).b;
	});
var $author$project$Lib$Tools$ArrayTools$writeInArray2D_ = function (_v0) {
	writeInArray2D_:
	while (true) {
		var arr = _v0.a;
		var _v1 = _v0.b;
		var start = _v1.a;
		var cur = _v1.b;
		var target = _v0.c;
		var _this = A2(
			$elm$core$Maybe$withDefault,
			0,
			A3($tortus$elm_array_2d$Array2D$get, cur.a, cur.b, arr));
		var ntarget = A4($tortus$elm_array_2d$Array2D$set, start.a + cur.a, start.b + cur.b, _this, target);
		var nindex = ((_Utils_cmp(
			cur.a,
			$tortus$elm_array_2d$Array2D$rows(arr) - 1) > -1) && (_Utils_cmp(
			cur.b,
			$tortus$elm_array_2d$Array2D$columns(arr) - 1) > -1)) ? _Utils_Tuple2(-1, -1) : ((_Utils_cmp(
			cur.a,
			$tortus$elm_array_2d$Array2D$rows(arr) - 1) > -1) ? _Utils_Tuple2(0, cur.b + 1) : _Utils_Tuple2(cur.a + 1, cur.b));
		if (_Utils_eq(nindex.a, -1) && _Utils_eq(nindex.b, -1)) {
			return _Utils_Tuple3(
				arr,
				_Utils_Tuple2(start, cur),
				ntarget);
		} else {
			var $temp$_v0 = _Utils_Tuple3(
				arr,
				_Utils_Tuple2(start, nindex),
				ntarget);
			_v0 = $temp$_v0;
			continue writeInArray2D_;
		}
	}
};
var $author$project$Lib$Tools$ArrayTools$writeInArray2D = F3(
	function (arr, _v0, target) {
		var x = _v0.a;
		var y = _v0.b;
		var _v1 = $author$project$Lib$Tools$ArrayTools$writeInArray2D_(
			_Utils_Tuple3(
				arr,
				_Utils_Tuple2(
					_Utils_Tuple2(x, y),
					_Utils_Tuple2(0, 0)),
				target));
		var _v2 = _v1.b;
		var res = _v1.c;
		return res;
	});
var $author$project$Lib$Tools$ArrayTools$combine = F2(
	function (acc, arr) {
		var src = $author$project$Lib$Tools$ArrayTools$array2D_flatten_column(arr);
		var res = A3(
			$elm_community$list_extra$List$Extra$indexedFoldl,
			F3(
				function (i, arr2d, target) {
					return A3(
						$author$project$Lib$Tools$ArrayTools$writeInArray2D,
						arr2d,
						_Utils_Tuple2(
							A2(
								$elm$core$Basics$modBy,
								$tortus$elm_array_2d$Array2D$rows(arr),
								i) * 32,
							((i / $tortus$elm_array_2d$Array2D$rows(arr)) | 0) * 32),
						target);
				}),
			acc,
			src);
		return res;
	});
var $tortus$elm_array_2d$Array2D$map = F2(
	function (fn, array2d) {
		return A2(
			$tortus$elm_array_2d$Array2D$indexedMap,
			F3(
				function (_v0, _v1, val) {
					return fn(val);
				}),
			array2d);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genTileMap = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var map = model.bH;
	var initTileMap = A3(
		$tortus$elm_array_2d$Array2D$repeat,
		$tortus$elm_array_2d$Array2D$rows(map) * 32,
		$tortus$elm_array_2d$Array2D$columns(map) * 32,
		0);
	var tm = A2(
		$author$project$Lib$Tools$ArrayTools$combine,
		initTileMap,
		A2(
			$tortus$elm_array_2d$Array2D$map,
			function (room) {
				return room.dT;
			},
			map));
	var cd = env.bb;
	var ncd = _Utils_update(
		cd,
		{dT: tm});
	return _Utils_Tuple2(
		_Utils_update(
			env,
			{bb: ncd}),
		_Utils_update(
			model,
			{
				bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading(3)
			}));
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitStoreMsg = function (a) {
	return {$: 26, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loaded = {$: 1};
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$StoreInit = function (position) {
	return {bZ: position};
};
var $elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _v0 = gen(seed);
				var value = _v0.a;
				var newSeed = _v0.b;
				var $temp$revList = A2($elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var $elm$random$Random$list = F2(
	function (n, _v0) {
		var gen = _v0;
		return function (seed) {
			return A4($elm$random$Random$listHelp, _List_Nil, n, gen, seed);
		};
	});
var $author$project$Lib$Tools$RNG$genListInt = F2(
	function (_v0, n) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$list,
			n,
			$author$project$Lib$Tools$RNG$genInt(
				_Utils_Tuple2(a, b)));
	});
var $author$project$Lib$Tools$RNG$genRandomListInt = F3(
	function (t, n, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(
			$elm$random$Random$step,
			A2(
				$author$project$Lib$Tools$RNG$genListInt,
				_Utils_Tuple2(a, b),
				n),
			$author$project$Lib$Tools$RNG$seed(t)).a;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genTrans = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var validTrans = $elm$core$List$concat(
		$author$project$Lib$Tools$ArrayTools$array2D_flatten(
			A2(
				$tortus$elm_array_2d$Array2D$indexedMap,
				F3(
					function (row, col, room) {
						return A2(
							$elm$core$List$map,
							function (p) {
								return _Utils_Tuple3(row, col, p);
							},
							room.dY);
					}),
				model.bH)));
	var t = $elm$time$Time$posixToMillis(env.S.cU);
	var storeTrans = A2(
		$elm$core$List$map,
		function (p) {
			return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPoint(
				_Utils_Tuple2(
					p,
					_Utils_Tuple2(6, 28)));
		},
		model.cr);
	var ranList = A3(
		$author$project$Lib$Tools$RNG$genRandomListInt,
		t,
		$elm$core$List$length(model.cr),
		_Utils_Tuple2(
			0,
			$elm$core$List$length(validTrans) - 1));
	var trans = A2(
		$elm$core$List$map,
		function (i) {
			var _v1 = A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple3(
					0,
					0,
					_Utils_Tuple2(0, 0)),
				A2($elm_community$list_extra$List$Extra$getAt, i, validTrans));
			var row = _v1.a;
			var col = _v1.b;
			var p = _v1.c;
			return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPoint(
				_Utils_Tuple2(
					_Utils_Tuple2(row, col),
					p));
		},
		ranList);
	var msg = A2(
		$elm$core$List$map,
		function (p) {
			return _Utils_Tuple2(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitStoreMsg(
					$author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$StoreInit(
						$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPoint(
							_Utils_Tuple2(
								p,
								_Utils_Tuple2(16, 26))))));
		},
		model.cr);
	return _Utils_Tuple2(
		_Utils_Tuple2(
			env,
			_Utils_update(
				model,
				{bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loaded, bJ: trans, cs: storeTrans})),
		msg);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$nullModel = {
	aX: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Blueprint$nullBlueprint,
	bH: $tortus$elm_array_2d$Array2D$empty,
	bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loaded,
	bJ: _List_Nil,
	cm: $tortus$elm_array_2d$Array2D$empty,
	cn: _Utils_Tuple2(
		_Utils_Tuple2(0, 0),
		_Utils_Tuple2(0, 0)),
	cr: _List_Nil,
	cs: _List_Nil
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$enemyPointInMap = F3(
	function (row, col, room) {
		var enemies = A2(
			$elm$core$List$map,
			function (_v0) {
				var _v1 = _v0.a;
				var x = _v1.a;
				var y = _v1.b;
				var max = _v0.b;
				var t = _v0.c;
				return _Utils_Tuple3(
					_Utils_Tuple2(x + (row * 32), y + (col * 32)),
					A2(
						$author$project$Lib$Tools$RNG$genRandomIntWithSeed,
						$author$project$Lib$Tools$RNG$seed((row * 10) + col),
						_Utils_Tuple2(0, max)).a,
					t);
			},
			room.c$);
		return enemies;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$randomGenEnemy = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var tm = env.bb.dT;
	var sm = model.cm;
	var ml = A2(
		$elm$core$Basics$max,
		$tortus$elm_array_2d$Array2D$columns(tm),
		$tortus$elm_array_2d$Array2D$rows(tm));
	var allEnemies = $elm$core$List$concat(
		$author$project$Lib$Tools$ArrayTools$array2D_flatten(
			A2(
				$tortus$elm_array_2d$Array2D$indexedMap,
				F3(
					function (row, col, room) {
						return (A2(
							$elm$core$Maybe$withDefault,
							0,
							A3($tortus$elm_array_2d$Array2D$get, row, col, sm)) < 0) ? _List_Nil : A3($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$enemyPointInMap, row, col, room);
					}),
				model.bH)));
	var elite = A2(
		$elm$core$List$map,
		function (_v8) {
			var x = _v8.a;
			var y = _v8.b;
			return _Utils_Tuple3(
				_Utils_Tuple2(x, y),
				A2(
					$elm$core$Basics$max,
					0,
					A2(
						$author$project$Lib$Tools$RNG$genRandomInt,
						(x * 1206) + y,
						_Utils_Tuple2(-5, 1))),
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(3));
		},
		A2(
			$elm$core$List$filter,
			function (_v7) {
				var x = _v7.a;
				var y = _v7.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					A2(
						$elm$core$Maybe$withDefault,
						1,
						A3($tortus$elm_array_2d$Array2D$get, x, y, tm)));
			},
			A2(
				$elm$core$List$map,
				function (_v5) {
					var _v6 = _v5.a;
					var x = _v6.a;
					var y = _v6.b;
					return _Utils_Tuple2(
						A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							(x * 2004) + y,
							_Utils_Tuple2(x - 5, x + 5)),
						A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							x + (y * 2004),
							_Utils_Tuple2(y - 5, y + 5)));
				},
				allEnemies)));
	var flying = A2(
		$elm$core$List$map,
		function (_v4) {
			var x = _v4.a;
			var y = _v4.b;
			return _Utils_Tuple3(
				_Utils_Tuple2(x, y),
				A2(
					$elm$core$Basics$max,
					0,
					A2(
						$author$project$Lib$Tools$RNG$genRandomInt,
						(x * 1206) + y,
						_Utils_Tuple2(-5, 3))),
				$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(2));
		},
		A2(
			$elm$core$List$filter,
			function (_v3) {
				var x = _v3.a;
				var y = _v3.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					A2(
						$elm$core$Maybe$withDefault,
						1,
						A3($tortus$elm_array_2d$Array2D$get, x, y, tm)));
			},
			A2(
				$elm$core$List$map,
				function (_v1) {
					var _v2 = _v1.a;
					var x = _v2.a;
					var y = _v2.b;
					return _Utils_Tuple2(
						A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							(x * 1206) + y,
							_Utils_Tuple2(x - 5, x + 5)),
						A2(
							$author$project$Lib$Tools$RNG$genRandomInt,
							x + (y * 1206),
							_Utils_Tuple2(y - 5, y + 5)));
				},
				allEnemies)));
	return _Utils_ap(
		allEnemies,
		_Utils_ap(flying, elite));
};
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$updateModel = F2(
	function (env, d) {
		var omodel = function () {
			var _v9 = d.c5;
			if (_v9.$ === 6) {
				var model = _v9.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$nullModel;
			}
		}();
		var _v0 = function () {
			var _v2 = omodel.bI;
			if (!_v2.$) {
				switch (_v2.a) {
					case 0:
						var _v3 = _v2.a;
						return _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genBlueprint(
								_Utils_Tuple2(env, omodel)),
							_List_Nil);
					case 1:
						var _v4 = _v2.a;
						return _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genRoom(
								_Utils_Tuple2(env, omodel)),
							_List_Nil);
					case 2:
						var _v5 = _v2.a;
						return _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genTileMap(
								_Utils_Tuple2(env, omodel)),
							_List_Nil);
					case 3:
						var _v6 = _v2.a;
						return _Utils_Tuple2(
							_Utils_Tuple2(
								env,
								_Utils_update(
									omodel,
									{
										bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading(4)
									})),
							_List_fromArray(
								[
									_Utils_Tuple2(
									$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
									$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCInitPlayerMsg(
										$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calPoint(omodel.cn)))
								]));
					case 4:
						var _v7 = _v2.a;
						return _Utils_Tuple2(
							_Utils_Tuple2(
								env,
								_Utils_update(
									omodel,
									{
										bI: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$Loading(5)
									})),
							$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$calEnemyPoint(
								$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$randomGenEnemy(
									_Utils_Tuple2(env, omodel))));
					default:
						var _v8 = _v2.a;
						return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$genTrans(
							_Utils_Tuple2(env, omodel));
				}
			} else {
				return _Utils_Tuple2(
					_Utils_Tuple2(env, omodel),
					_List_Nil);
			}
		}();
		var _v1 = _v0.a;
		var nenv = _v1.a;
		var nmodel = _v1.b;
		var nmsg = _v0.b;
		return _Utils_Tuple3(
			_Utils_update(
				d,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCGameMapModel(nmodel)
				}),
			nmsg,
			nenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName = function (a) {
	return {$: 2, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$Transfer = function (a) {
	return {$: 27, a: a};
};
var $author$project$Lib$Coordinate$Coordinates$dist = F2(
	function (_v0, _v1) {
		var x1 = _v0.a;
		var y1 = _v0.b;
		var x2 = _v1.a;
		var y2 = _v1.b;
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, x1 - x2, 2) + A2($elm$core$Basics$pow, y1 - y2, 2));
	});
var $author$project$Lib$Tools$KeyCode$key_r = 82;
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$updateModelRec = F3(
	function (env, msg, d) {
		var model = function () {
			var _v1 = d.c5;
			if (_v1.$ === 6) {
				var m = _v1.a;
				return m;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$nullModel;
			}
		}();
		if (msg.$ === 9) {
			var p = msg.a;
			var msg2 = A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, t) {
						return (_Utils_eq(env.bb.bt, $author$project$SceneProtos$CoreEngine$LayerBase$Other) && ((A2($author$project$Lib$Coordinate$Coordinates$dist, t, p) <= 150) && A2(
							$elm$core$Maybe$withDefault,
							false,
							A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_r, env.S.dd)))) ? _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$Transfer(
								A2(
									$elm$core$Maybe$withDefault,
									_Utils_Tuple2(0, 0),
									A2($elm_community$list_extra$List$Extra$getAt, i, model.bJ)))) : _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCMsg);
					}),
				model.cs);
			var msg1 = A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, t) {
						return (_Utils_eq(env.bb.bt, $author$project$SceneProtos$CoreEngine$LayerBase$Other) && ((A2($author$project$Lib$Coordinate$Coordinates$dist, t, p) <= 150) && A2(
							$elm$core$Maybe$withDefault,
							false,
							A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_r, env.S.dd)))) ? _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$Transfer(
								A2(
									$elm$core$Maybe$withDefault,
									_Utils_Tuple2(0, 0),
									A2($elm_community$list_extra$List$Extra$getAt, i, model.cs)))) : _Utils_Tuple2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCMsg);
					}),
				model.bJ);
			if ($elm$core$List$length(
				_Utils_ap(msg1, msg2)) > 0) {
				var gd = env.S;
				var ngd = _Utils_update(
					gd,
					{
						dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_r, false, gd.dd)
					});
				return _Utils_Tuple3(
					d,
					_Utils_ap(msg1, msg2),
					_Utils_update(
						env,
						{S: ngd}));
			} else {
				return _Utils_Tuple3(
					d,
					_Utils_ap(msg1, msg2),
					env);
			}
		} else {
			return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Display$debug = F2(
	function (env, d) {
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 6) {
				var model = _v0.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$nullModel;
			}
		}();
		return A2($linsyking$elm_canvas$Canvas$group, _List_Nil, _List_Nil);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Display$displayTrans = F2(
	function (env, d) {
		var omodel = function () {
			var _v1 = d.c5;
			if (_v1.$ === 6) {
				var model = _v1.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$nullModel;
			}
		}();
		var trans = _Utils_ap(omodel.bJ, omodel.cs);
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
				]),
			A2(
				$elm$core$List$map,
				function (_v0) {
					var x = _v0.a;
					var y = _v0.b;
					return A5(
						$author$project$Lib$Render$Sprite$renderSprite,
						env.S,
						_List_Nil,
						A2(
							$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
							env,
							_Utils_Tuple2(x - $author$project$MainConfig$tileSize, y - $author$project$MainConfig$tileSize)),
						A2(
							$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
							env,
							_Utils_Tuple2(2 * $author$project$MainConfig$tileSize, 2 * $author$project$MainConfig$tileSize)),
						'port');
				},
				trans));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Display$displayGameMap = F2(
	function (env, d) {
		var tileSizeF = $author$project$MainConfig$tileSize;
		var tileMap = env.bb.dT;
		var camera = env.bb.b;
		var _v0 = camera.ag;
		var sx = _v0.a;
		var sy = _v0.b;
		var _v1 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, camera.bZ);
		var cx = _v1.a;
		var cy = _v1.b;
		var _v2 = _Utils_Tuple2(cx - (sx / 2), cy - (sy / 2));
		var px1 = _v2.a;
		var py1 = _v2.b;
		var _v3 = _Utils_Tuple2(
			$elm$core$Basics$floor(px1 / tileSizeF),
			$elm$core$Basics$floor(py1 / tileSizeF));
		var cxid1 = _v3.a;
		var cyid1 = _v3.b;
		var _v4 = _Utils_Tuple2(cx + (sx / 2), cy + (sy / 2));
		var px2 = _v4.a;
		var py2 = _v4.b;
		var _v5 = _Utils_Tuple2(
			$elm$core$Basics$floor(px2 / tileSizeF),
			$elm$core$Basics$floor(py2 / tileSizeF));
		var cxid2 = _v5.a;
		var cyid2 = _v5.b;
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$linsyking$elm_canvas$Canvas$group,
					_List_Nil,
					A2(
						$elm$core$List$map,
						function (_v8) {
							var row = _v8.a;
							var col = _v8.b;
							var t = _v8.c;
							var r = row;
							var c = col;
							return ((_Utils_cmp(
								A2(
									$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
									env,
									_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).a,
								-$author$project$MainConfig$tileSize) > -1) && ((_Utils_cmp(
								A2(
									$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
									env,
									_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).a,
								1920 + $author$project$MainConfig$tileSize) < 1) && ((_Utils_cmp(
								A2(
									$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
									env,
									_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).b,
								-$author$project$MainConfig$tileSize) > -1) && (_Utils_cmp(
								A2(
									$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
									env,
									_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).b,
								1080 + $author$project$MainConfig$tileSize) < 1)))) ? A2(
								$linsyking$elm_canvas$Canvas$group,
								_List_fromArray(
									[
										$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
									]),
								_List_fromArray(
									[
										A5(
										$author$project$Lib$Render$Sprite$renderSprite,
										env.S,
										_List_Nil,
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
											env,
											_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)),
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
											env,
											_Utils_Tuple2($author$project$MainConfig$tileSize, $author$project$MainConfig$tileSize)),
										'tile_' + $elm$core$String$fromInt(t))
									])) : $linsyking$elm_canvas$Canvas$empty;
						},
						A2(
							$elm$core$List$concatMap,
							$elm$core$Array$toList,
							$elm$core$Array$toList(
								A2(
									$tortus$elm_array_2d$Array2D$map,
									function (_v6) {
										var _v7 = _v6.a;
										var row = _v7.a;
										var col = _v7.b;
										var cell = _v6.b;
										return _Utils_Tuple3(row, col, cell);
									},
									A3(
										$author$project$Lib$Tools$ArrayTools$array2D_indexedSlice,
										_Utils_Tuple2(cxid1, cyid1),
										_Utils_Tuple2(cxid2, cyid2),
										tileMap)).cV)))),
					A2($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Display$displayTrans, env, d),
					A2($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Display$debug, env, d)
				]));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Display$displayGameMap, env, d),
				0)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$initModel, env, i),
			dr: 'GameMap',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPauseMenuModel = function (a) {
	return {$: 10, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Base$nullModel = {
	a1: _Utils_Tuple2(400, 200),
	b5: _Utils_Tuple2(960, 540),
	b8: _Utils_Tuple2(960, 300)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 6)) {
			var id = initData.a;
			var d = initData.b.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(0, 0))
					]))($author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox)(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPauseMenuModel($author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Base$nullModel))($author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$Lib$Tools$KeyCode$escape = 27;
var $author$project$Lib$Coordinate$Coordinates$judgeMouseRect = F3(
	function (_v0, _v1, _v2) {
		var mx = _v0.a;
		var my = _v0.b;
		var x = _v1.a;
		var y = _v1.b;
		var w = _v2.a;
		var h = _v2.b;
		return ((_Utils_cmp(x, mx) < 1) && ((_Utils_cmp(mx, x + w) < 1) && ((_Utils_cmp(y, my) < 1) && (_Utils_cmp(my, y + h) < 1)))) ? true : false;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$updateModel = F2(
	function (env, d) {
		var model = function () {
			var _v2 = d.c5;
			if (_v2.$ === 10) {
				var pauseMenu = _v2.a;
				return pauseMenu;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Base$nullModel;
			}
		}();
		var quitX = model.b5.a - (model.a1.a / 2);
		var quitY = model.b5.b - (model.a1.b / 2);
		var resumeX = model.b8.a - (model.a1.a / 2);
		var resumeY = model.b8.b - (model.a1.b / 2);
		var gd = env.S;
		var _v0 = gd.dp ? (A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			gd.dq,
			_Utils_Tuple2(resumeX, resumeY),
			model.a1) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)) : (A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			gd.dq,
			_Utils_Tuple2(quitX, quitY),
			model.a1) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$QuitMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)) : _Utils_Tuple2(_List_Nil, env))) : _Utils_Tuple2(_List_Nil, env);
		var nmsg = _v0.a;
		var nenv = _v0.b;
		var _v1 = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$escape, env.S.dd)) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$escape, false, env.S.dd)
								});
						}(e.S)
					});
			}(nenv)) : _Utils_Tuple2(_List_Nil, nenv);
		var pmsg = _v1.a;
		var penv = _v1.b;
		return _Utils_Tuple3(
			d,
			_Utils_ap(nmsg, pmsg),
			penv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $avh4$elm_color$Color$darkOrange = A4($avh4$elm_color$Color$RgbaSpace, 206 / 255, 92 / 255, 0 / 255, 1.0);
var $avh4$elm_color$Color$darkRed = A4($avh4$elm_color$Color$RgbaSpace, 164 / 255, 0 / 255, 0 / 255, 1.0);
var $author$project$Lib$Render$Text$renderTextWithStyle = F6(
	function (gd, size, s, ft, style, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var rx = A2($author$project$Lib$Coordinate$Coordinates$lengthToReal, gd, size);
		var _v1 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			gd,
			_Utils_Tuple2(x, y));
		var dsx = _v1.a;
		var dsy = _v1.b;
		return A3(
			$linsyking$elm_canvas$Canvas$text,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Text$font(
					{
						ae: ft,
						ag: $elm$core$Basics$floor(rx),
						ai: style
					}),
					$linsyking$elm_canvas$Canvas$Settings$Text$align(3),
					$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$black),
					$linsyking$elm_canvas$Canvas$Settings$Text$baseLine(0)
				]),
			_Utils_Tuple2(dsx, dsy),
			s);
	});
var $author$project$Lib$Render$Text$renderText = F5(
	function (gd, size, s, ft, pos) {
		return A6($author$project$Lib$Render$Text$renderTextWithStyle, gd, size, s, ft, '', pos);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$displayPauseMenuAsRect = F2(
	function (env, d) {
		var model = function () {
			var _v0 = d.c5;
			if (_v0.$ === 10) {
				var pauseMenuModel = _v0.a;
				return pauseMenuModel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Base$nullModel;
			}
		}();
		var quitX = model.b5.a - (model.a1.a / 2);
		var quitY = model.b5.b - (model.a1.b / 2);
		var resumeX = model.b8.a - (model.a1.a / 2);
		var resumeY = model.b8.b - (model.a1.b / 2);
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$linsyking$elm_canvas$Canvas$shapes,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$darkOrange)
						]),
					_List_fromArray(
						[
							A3(
							$author$project$Lib$Render$Shape$rect,
							env.S,
							_Utils_Tuple2(resumeX, resumeY),
							model.a1)
						])),
					A2(
					$linsyking$elm_canvas$Canvas$shapes,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$darkRed)
						]),
					_List_fromArray(
						[
							A3(
							$author$project$Lib$Render$Shape$rect,
							env.S,
							_Utils_Tuple2(quitX, quitY),
							model.a1)
						])),
					A5(
					$author$project$Lib$Render$Text$renderText,
					env.S,
					40,
					'Resume the Game',
					'Arial',
					_Utils_Tuple2(resumeX, resumeY)),
					A5(
					$author$project$Lib$Render$Text$renderText,
					env.S,
					40,
					'Quit the Game',
					'Arial',
					_Utils_Tuple2(quitX, quitY))
				]));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$displayPauseMenuAsRect, env, d),
				100)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$initModel, env, i),
			dr: 'PauseMenu',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerModel = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$mass = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle = {$: 0};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$InAir = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal = {$: 0};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Right = 1;
var $author$project$Lib$Tools$KeyCode$space = 32;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$initBoundKey = {bw: $author$project$Lib$Tools$KeyCode$key_w, bx: $author$project$Lib$Tools$KeyCode$space, bD: $author$project$Lib$Tools$KeyCode$key_a, ca: $author$project$Lib$Tools$KeyCode$key_d};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel = {aZ: $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$initBoundKey, bf: 1, bL: 200, bO: $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal, bP: $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle, b_: 0};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 14)) {
			var id = initData.a;
			var d = initData.b.a;
			var hp = 200;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(d.ag)(d.du)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, $author$project$MainConfig$gravity * $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$mass))($author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$mass)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 5),
						_Utils_Tuple2(64, 118))
					]))(
				A2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
					_Utils_Tuple2(0, 5),
					_Utils_Tuple2(60, 117)))(hp)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerModel(
					_Utils_update(
						$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel,
						{bL: hp})))($author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$EnemyUpdateMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerPositionMsg = function (a) {
	return {$: 9, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$PauseMsg = {$: 18};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$PlayerDeadMsg = {$: 34};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$UpgradeInitMsg = function (a) {
	return {$: 24, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$WeaponUpdateMsg = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$InDoubleJump = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingDown = function (a) {
	return {$: 4, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingTop = function (a) {
	return {$: 3, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp = function (a) {
	return {$: 2, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer = function (a) {
	return {$: 5, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Left = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$OnGround = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Walking = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex = F2(
	function (ms, str) {
		if (str === 'Walking') {
			if (ms.$ === 1) {
				var i = ms.a;
				return i;
			} else {
				return 0;
			}
		} else {
			if (str === 'JumpingUp') {
				if (ms.$ === 2) {
					var i = ms.a;
					return i;
				} else {
					return 0;
				}
			} else {
				if (str === 'JumpingTop') {
					if (ms.$ === 3) {
						var i = ms.a;
						return i;
					} else {
						return 0;
					}
				} else {
					if (str === 'JumpingDown') {
						if (ms.$ === 4) {
							var i = ms.a;
							return i;
						} else {
							return 0;
						}
					} else {
						if (str === 'LandingBuffer') {
							if (ms.$ === 5) {
								var i = ms.a;
								return i;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					}
				}
			}
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isInDoubleJump = function (motion) {
	if (motion.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingDown = function (ms) {
	if (ms.$ === 4) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingTop = function (ms) {
	if (ms.$ === 3) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingUp = function (ms) {
	if (ms.$ === 2) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer = function (ms) {
	if (ms.$ === 5) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking = function (ms) {
	if (ms.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$changeState = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var vel = d.cz;
	var omodel = function () {
		var _v5 = d.c5;
		if (_v5.$ === 1) {
			var model = _v5.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
		}
	}();
	var omotion = omodel.bO;
	var omstate = omodel.bP;
	var opstate = omodel.b_;
	var odir = omodel.bf;
	var kl = env.S.dd;
	var changeMotion = function (motion) {
		if (motion.$ === 1) {
			var n = motion.a;
			return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$InDoubleJump(n + 1);
		} else {
			return motion;
		}
	};
	var bk = omodel.aZ;
	var changeDir = function (dir) {
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, bk.ca, kl)) ? 1 : (A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, bk.bD, kl)) ? 0 : dir);
	};
	var _v1 = function () {
		if (opstate === 1) {
			return ((_Utils_eq(omstate, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle) || ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking(omstate) || $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer(omstate))) && (A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.ca, kl)) && A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bD, kl)))) ? ((A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bw, kl)) || A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bx, kl))) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(0),
					0,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				changeDir(odir)) : _Utils_Tuple2(
				_Utils_Tuple3($author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle, 1, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				odir)) : (((_Utils_eq(omstate, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle) || ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer(omstate) || ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking(omstate) && (!omodel.bf)))) && A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.ca, kl))) ? ((A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bw, kl)) || A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bx, kl))) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(0),
					0,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				1) : _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Walking(0),
					1,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				1)) : (((_Utils_eq(omstate, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle) || ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer(omstate) || ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking(omstate) && (omodel.bf === 1)))) && A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bD, kl))) ? ((A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bw, kl)) || A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bx, kl))) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(0),
					0,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				0) : _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Walking(0),
					1,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				0)) : (((_Utils_eq(omstate, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle) || ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking(omstate) || $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer(omstate))) && (A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bw, kl)) || A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bx, kl)))) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(0),
					0,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				changeDir(odir)) : (($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking(omstate) && (A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.ca, kl)) || A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bD, kl)))) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Walking(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex, omstate, 'Walking') + 1),
					1,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				odir) : ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingDown(omstate) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer(0),
					1,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				changeDir(odir)) : ((_Utils_eq(
				omstate,
				$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer(9)) || (_Utils_eq(
				omstate,
				$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer(10)) || _Utils_eq(
				omstate,
				$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer(11)))) ? _Utils_Tuple2(
				_Utils_Tuple3($author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle, 1, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				odir) : ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer(omstate) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex, omstate, 'LandingBuffer') + 1),
					1,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				changeDir(odir)) : _Utils_Tuple2(
				_Utils_Tuple3($author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle, opstate, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Normal),
				odir))))))));
		} else {
			return (_Utils_eq(omstate, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle) || $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isWalking(omstate)) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingTop(0),
					0,
					omotion),
				odir) : (((!$author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isInDoubleJump(omotion)) && (A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bw, kl)) || A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, bk.bx, kl)))) ? _Utils_Tuple2(
				_Utils_Tuple3(
					omstate,
					opstate,
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$InDoubleJump(0)),
				changeDir(odir)) : ((($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingTop(omstate) || $author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingUp(omstate)) && (vel.b >= 5)) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingDown(0),
					0,
					omotion),
				changeDir(odir)) : (($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingUp(omstate) && (_Utils_cmp(vel.b, -5) > 0)) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingTop(0),
					0,
					omotion),
				changeDir(odir)) : ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingUp(omstate) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex, omstate, 'JumpingUp') + 1),
					0,
					changeMotion(omotion)),
				changeDir(odir)) : ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingTop(omstate) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingTop(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex, omstate, 'JumpingTop') + 1),
					0,
					changeMotion(omotion)),
				changeDir(odir)) : ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isJumpingDown(omstate) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingDown(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex, omstate, 'JumpingDown') + 1),
					0,
					changeMotion(omotion)),
				changeDir(odir)) : ($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$isLandingBuffer(omstate) ? _Utils_Tuple2(
				_Utils_Tuple3(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$LandingBuffer(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$State$getAnimIndex, omstate, 'LandingBuffer') + 1),
					0,
					changeMotion(omotion)),
				changeDir(odir)) : _Utils_Tuple2(
				_Utils_Tuple3(omstate, opstate, omotion),
				changeDir(odir)))))))));
		}
	}();
	var _v2 = _v1.a;
	var nmstate = _v2.a;
	var npstate = _v2.b;
	var nmotion = _v2.c;
	var ndir = _v1.b;
	var nenv = function () {
		var gd = env.S;
		return (_Utils_eq(
			nmstate,
			$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(0)) || _Utils_eq(
			nmotion,
			$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$InDoubleJump(0))) ? _Utils_update(
			env,
			{
				S: _Utils_update(
					gd,
					{
						dd: A3(
							$elm$core$Array$set,
							bk.bx,
							false,
							A3($elm$core$Array$set, bk.bw, false, env.S.dd))
					})
			}) : env;
	}();
	return _Utils_Tuple3(
		_Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerModel(
					_Utils_update(
						omodel,
						{bf: ndir, bO: nmotion, bP: nmstate, b_: npstate}))
			}),
		ls,
		nenv);
};
var $author$project$Lib$Tools$KeyCode$key_e = 69;
var $author$project$SceneProtos$CoreEngine$LayerBase$Transfering = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateInputState = function (env) {
	var oc = env.bb;
	var nc = _Utils_update(
		oc,
		{
			bt: function () {
				var _v0 = oc.bt;
				if (!_v0.$) {
					var i = _v0.a;
					return (i < 0) ? $author$project$SceneProtos$CoreEngine$LayerBase$Other : $author$project$SceneProtos$CoreEngine$LayerBase$Transfering(i - 1);
				} else {
					return $author$project$SceneProtos$CoreEngine$LayerBase$Other;
				}
			}()
		});
	return _Utils_update(
		env,
		{bb: nc});
};
var $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleIsOnGround = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	var tm = env.bb.dT;
	var hb = d.cl;
	var _v1 = d.bZ;
	var x = _v1.a;
	var y = _v1.b;
	var _v2 = _Utils_Tuple2(x + hb.bT.a, (y + hb.bT.b) + 25);
	var x_ = _v2.a;
	var y_ = _v2.b;
	var _v3 = hb.ag;
	var w_ = _v3.a;
	var h_ = _v3.b;
	var br = _Utils_Tuple2(
		($elm$core$Basics$floor(x_ + (w_ / 2)) / $author$project$MainConfig$tileSize) | 0,
		($elm$core$Basics$floor(y_ + (h_ / 2)) / $author$project$MainConfig$tileSize) | 0);
	var tl = _Utils_Tuple2(
		($elm$core$Basics$floor(x_ - (w_ / 2)) / $author$project$MainConfig$tileSize) | 0,
		($elm$core$Basics$floor(y_ - (h_ / 2)) / $author$project$MainConfig$tileSize) | 0);
	var slice = $author$project$Lib$Tools$ArrayTools$array2D_flatten(
		A3($author$project$Lib$Tools$ArrayTools$array2D_slice, tl, br, tm));
	var check = A2(
		$elm$core$List$map,
		function (grid) {
			return A2($elm$core$Basics$modBy, 2, grid) === 1;
		},
		slice);
	return A2($elm$core$List$member, true, check);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updatePositionState = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var omodel = function () {
		var _v1 = d.c5;
		if (_v1.$ === 1) {
			var model = _v1.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
		}
	}();
	return $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleIsOnGround(
		_Utils_Tuple2(env, d)) ? _Utils_Tuple3(
		_Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerModel(
					_Utils_update(
						omodel,
						{b_: 1}))
			}),
		ls,
		env) : _Utils_Tuple3(
		_Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerModel(
					_Utils_update(
						omodel,
						{b_: 0}))
			}),
		ls,
		env);
};
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$jumpVel = 25.5;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$speed = 10;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$speedIncreased = 15;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateVel = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var ovel = d.cz;
	var omodel = function () {
		var _v3 = d.c5;
		if (_v3.$ === 1) {
			var model = _v3.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
		}
	}();
	var nvel = (_Utils_eq(
		omodel.bP,
		$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$JumpingUp(0)) || _Utils_eq(
		omodel.bO,
		$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$InDoubleJump(0))) ? _Utils_Tuple2(ovel.a, -$author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$jumpVel) : ovel;
	var nspeed = (!_Utils_eq(
		A2(
			$elm_community$list_extra$List$Extra$findIndex,
			function (b) {
				if (b.$ === 1) {
					return true;
				} else {
					return false;
				}
			},
			env.bb.cN),
		$elm$core$Maybe$Nothing)) ? $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$speedIncreased : $author$project$SceneProtos$CoreEngine$GameComponents$Player$Config$speed;
	var kl = env.S.dd;
	var bk = omodel.aZ;
	var nvel2 = _Utils_eq(omodel.bP, $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$Idle) ? _Utils_Tuple2(0, nvel.b) : ((A2(
		$elm$core$Maybe$withDefault,
		false,
		A2($elm$core$Array$get, bk.ca, kl)) && A2(
		$elm$core$Maybe$withDefault,
		false,
		A2($elm$core$Array$get, bk.bD, kl))) ? _Utils_Tuple2(0, nvel.b) : (((omodel.bf === 1) && A2(
		$elm$core$Maybe$withDefault,
		false,
		A2($elm$core$Array$get, bk.ca, kl))) ? _Utils_Tuple2(nspeed, nvel.b) : (((!omodel.bf) && A2(
		$elm$core$Maybe$withDefault,
		false,
		A2($elm$core$Array$get, bk.bD, kl))) ? _Utils_Tuple2(-nspeed, nvel.b) : _Utils_Tuple2(0, nvel.b))));
	var _v1 = $author$project$SceneProtos$CoreEngine$Physics$Movement$updateVelByAcc(
		_Utils_Tuple2(
			env,
			_Utils_update(
				d,
				{cz: nvel2})));
	var newenv = _v1.a;
	var newdata = _v1.b;
	return _Utils_Tuple3(newdata, ls, newenv);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateModel = F2(
	function (env, d) {
		var _v0 = d.dg;
		if (!_v0.$) {
			var _v1 = $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateVel(
				$author$project$SceneProtos$CoreEngine$GameComponents$Player$State$changeState(
					$author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updatePositionState(
						_Utils_Tuple3(d, _List_Nil, env))));
			var nd = _v1.a;
			var nl = _v1.b;
			var nenv = _v1.c;
			var _v2 = $author$project$SceneProtos$CoreEngine$Physics$Collision$simpleHandleGonnaCollideXY(
				_Utils_Tuple2(nenv, nd));
			var nenv2 = _v2.a;
			var nd2 = _v2.b;
			var nmodel = function () {
				var _v5 = nd2.c5;
				if (_v5.$ === 1) {
					var model = _v5.a;
					return model;
				} else {
					return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
				}
			}();
			var ndir = nmodel.bf;
			var npos = nd2.bZ;
			var nl2 = _List_fromArray(
				[
					_Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Weapon'),
					A2($author$project$SceneProtos$CoreEngine$GameComponent$Base$WeaponUpdateMsg, npos, ndir)),
					_Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Enemy'),
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$EnemyUpdateMsg(npos)),
					_Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Store'),
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerPositionMsg(npos)),
					_Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('GameMap'),
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerPositionMsg(npos))
				]);
			var _v3 = A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$escape, env.S.dd)) ? _Utils_Tuple2(
				_List_fromArray(
					[
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$PauseMsg)
					]),
				function (e) {
					return _Utils_update(
						e,
						{
							S: function (gd) {
								return _Utils_update(
									gd,
									{
										dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$escape, false, env.S.dd)
									});
							}(e.S)
						});
				}(nenv2)) : _Utils_Tuple2(_List_Nil, nenv2);
			var pmsg = _v3.a;
			var penv = _v3.b;
			var _v4 = A2(
				$elm$core$Maybe$withDefault,
				false,
				A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_e, env.S.dd)) ? _Utils_Tuple2(
				_List_fromArray(
					[
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$UpgradeInitMsg(d.bo))
					]),
				function (e) {
					return _Utils_update(
						e,
						{
							S: function (gd) {
								return _Utils_update(
									gd,
									{
										dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_e, false, env.S.dd)
									});
							}(e.S)
						});
				}(penv)) : _Utils_Tuple2(_List_Nil, penv);
			var umsg = _v4.a;
			var uenv = _v4.b;
			return _Utils_Tuple3(
				nd2,
				_Utils_ap(
					nl,
					_Utils_ap(
						nl2,
						_Utils_ap(pmsg, umsg))),
				$author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateInputState(uenv));
		} else {
			var dt = _v0.a;
			return _Utils_Tuple3(
				_Utils_update(
					d,
					{
						dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(dt + 1)
					}),
				(!dt) ? _List_fromArray(
					[
						_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$PlayerDeadMsg)
					]) : _List_Nil,
				env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateModelRec = F3(
	function (env, gcmsg, d) {
		switch (gcmsg.$) {
			case 8:
				var gcModel = gcmsg.a;
				if (gcModel.$ === 5) {
					var bullet = gcModel.a;
					var nhp = d.bo - bullet.aO;
					return ((nhp <= 0) && _Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)) ? _Utils_Tuple3(
						_Utils_update(
							d,
							{
								bo: nhp,
								dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
							}),
						_List_Nil,
						env) : _Utils_Tuple3(
						_Utils_update(
							d,
							{bo: nhp}),
						_List_Nil,
						env);
				} else {
					return _Utils_Tuple3(d, _List_Nil, env);
				}
			case 13:
				var gcModel = gcmsg.a;
				if (gcModel.$ === 2) {
					var enemy = gcModel.a;
					var nhp = d.bo - enemy.aO;
					return ((nhp < 0) && _Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)) ? _Utils_Tuple3(
						_Utils_update(
							d,
							{
								bo: nhp,
								dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
							}),
						_List_Nil,
						env) : _Utils_Tuple3(
						_Utils_update(
							d,
							{bo: nhp}),
						_List_Nil,
						env);
				} else {
					return _Utils_Tuple3(d, _List_Nil, env);
				}
			case 25:
				var i = gcmsg.a;
				return _Utils_Tuple3(
					_Utils_update(
						d,
						{bo: d.bo + i}),
					_List_Nil,
					env);
			case 27:
				var p = gcmsg.a;
				var oc = env.bb;
				var nc = _Utils_update(
					oc,
					{
						bt: $author$project$SceneProtos$CoreEngine$LayerBase$Transfering(100)
					});
				return _Utils_Tuple3(
					_Utils_update(
						d,
						{bZ: p}),
					_List_Nil,
					_Utils_update(
						env,
						{bb: nc}));
			default:
				return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$debug = F2(
	function (env, d) {
		var text = function () {
			var _v1 = env.S.dN;
			if (_v1 === 1) {
				return 'Paused';
			} else {
				return 'Active';
			}
		}();
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 1) {
				var model = _v0.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
			}
		}();
		return _List_Nil;
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$displayHP = F2(
	function (env, d) {
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 1) {
				var model = _v0.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
			}
		}();
		return _List_fromArray(
			[
				A5(
				$author$project$Lib$Render$Text$renderText,
				env.S,
				40,
				$elm$core$String$fromFloat(d.bo) + ('/' + $elm$core$String$fromFloat(omodel.bL)),
				'Times New Roman',
				_Utils_Tuple2(0, 1040))
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$displayMoney = F2(
	function (env, d) {
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 1) {
				var model = _v0.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
			}
		}();
		return _List_fromArray(
			[
				A6(
				$author$project$Lib$Render$Text$renderTextWithColor,
				env.S,
				40,
				'Money : ' + $elm$core$String$fromInt(env.bb.cR),
				'Times New Roman',
				$avh4$elm_color$Color$white,
				_Utils_Tuple2(0, 1000))
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$displayPlayer = F2(
	function (env, d) {
		var omodel = function () {
			var _v5 = d.c5;
			if (_v5.$ === 1) {
				var model = _v5.a;
				return model;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$nullModel;
			}
		}();
		var revFlag = function () {
			var _v4 = omodel.bf;
			if (!_v4) {
				return true;
			} else {
				return false;
			}
		}();
		var id = function () {
			var _v3 = omodel.bP;
			switch (_v3.$) {
				case 0:
					return 'scientist';
				case 1:
					var i = _v3.a;
					return 'scientist_walking_' + $elm$core$String$fromInt(
						A2($elm$core$Basics$modBy, 6, (i / 7) | 0) + 1);
				case 2:
					var i = _v3.a;
					return 'scientist_jumpingup_' + ((i <= 4) ? '1' : '2');
				case 3:
					return 'scientist_jumpingtop';
				case 4:
					return 'scientist_jumpingdown';
				default:
					var i = _v3.a;
					return 'scientist_landingbuffer_' + ((i <= 5) ? '1' : '2');
			}
		}();
		var alv = function () {
			var _v2 = d.dg;
			if (!_v2.$) {
				return 1;
			} else {
				var dt = _v2.a;
				return A2(
					$elm$core$Basics$min,
					1,
					A2($elm$core$Basics$max, 0, 1 - (dt / 100)));
			}
		}();
		var _v0 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var x_ = _v0.a;
		var y_ = _v0.b;
		var _v1 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam, env, d.ag);
		var w = _v1.a;
		var h = _v1.b;
		var y = y_ - (h / 2);
		var x = x_ - (w / 2);
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false),
					$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha(alv)
				]),
			A2(
				$elm$core$List$cons,
				A6(
					$author$project$Lib$Render$Sprite$renderSpriteWithRev,
					revFlag,
					env.S,
					_List_Nil,
					_Utils_Tuple2(x, y),
					_Utils_Tuple2(w, h),
					id),
				_Utils_ap(
					A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$debug, env, d),
					env.bb.dF ? A2(
						$elm$core$List$cons,
						A2(
							$linsyking$elm_canvas$Canvas$shapes,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$white)
								]),
							_List_fromArray(
								[
									A3(
									$author$project$Lib$Render$Shape$rect,
									env.S,
									_Utils_Tuple2(0, 1040),
									_Utils_Tuple2(150, 40))
								])),
						_Utils_ap(
							A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$displayHP, env, d),
							A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$displayMoney, env, d))) : _List_Nil)));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$Display$displayPlayer, env, d),
				3)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Player$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$initModel, env, i),
			dr: 'Player',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Player$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCRulesModel = function (a) {
	return {$: 13, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Base$nullModel = {
	aU: _Utils_Tuple2(200, 200),
	a1: _Utils_Tuple2(100, 50)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 6)) {
			var id = initData.a;
			var d = initData.b.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(0, 0))
					]))($author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox)(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCRulesModel($author$project$SceneProtos$CoreEngine$GameComponents$Rules$Base$nullModel))($author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$HideRulesMsg = {$: 23};
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$updateModel = F2(
	function (env, d) {
		var model = function () {
			var _v1 = d.c5;
			if (_v1.$ === 13) {
				var rulesModel = _v1.a;
				return rulesModel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Base$nullModel;
			}
		}();
		var gd = env.S;
		var backY = model.aU.b - (model.a1.b / 2);
		var backX = model.aU.a - (model.a1.a / 2);
		var _v0 = gd.dp ? (A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			gd.dq,
			_Utils_Tuple2(backX, backY),
			model.a1) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$HideRulesMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)) : _Utils_Tuple2(_List_Nil, env)) : _Utils_Tuple2(_List_Nil, env);
		var nmsg = _v0.a;
		var nenv = _v0.b;
		return _Utils_Tuple3(d, nmsg, nenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$viewModel = F2(
	function (env, d) {
		var model = function () {
			var _v0 = d.c5;
			if (_v0.$ === 13) {
				var rulesModel = _v0.a;
				return rulesModel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Base$nullModel;
			}
		}();
		var backY = model.aU.b - (model.a1.b / 2);
		var backX = model.aU.a - (model.a1.a / 2);
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					_Utils_Tuple2(0, 0),
					_Utils_Tuple2(0, 1080),
					'rules'),
				1),
				_Utils_Tuple2(
				A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					_Utils_Tuple2(backX, backY),
					model.a1,
					'back'),
				1),
				_Utils_Tuple2(
				A2(
					$linsyking$elm_canvas$Canvas$group,
					_List_Nil,
					_List_fromArray(
						[
							A6(
							$author$project$Lib$Render$Text$renderTextWithColor,
							env.S,
							48,
							'',
							'',
							$avh4$elm_color$Color$white,
							_Utils_Tuple2(400, 200))
						])),
				1000)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$initModel, env, i),
			dr: 'Rules',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Rules$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuModel = function (a) {
	return {$: 12, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$nullModel = {
	a1: _Utils_Tuple2(256, 128),
	cd: _Utils_Tuple2(960, 750),
	dL: _Utils_Tuple2(960, 600)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 5)) {
			var id = initData.a;
			var d = initData.b.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(0, 0))
					]))($author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox)(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuModel($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$nullModel))($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GameStartMsg = {$: 21};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$ShowRulesMsg = {$: 22};
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$updateModel = F2(
	function (env, d) {
		var model = function () {
			var _v1 = d.c5;
			if (_v1.$ === 12) {
				var starterMenuModel = _v1.a;
				return starterMenuModel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$nullModel;
			}
		}();
		var rulesX = model.cd.a - (model.a1.a / 2);
		var rulesY = model.cd.b - (model.a1.b / 2);
		var startX = model.dL.a - (model.a1.a / 2);
		var startY = model.dL.b - (model.a1.b / 2);
		var gd = env.S;
		var _v0 = gd.dp ? (A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			gd.dq,
			_Utils_Tuple2(startX, startY),
			model.a1) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$GameStartMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)) : (A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			gd.dq,
			_Utils_Tuple2(rulesX, rulesY),
			model.a1) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ShowRulesMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)) : _Utils_Tuple2(
			_List_Nil,
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)))) : _Utils_Tuple2(
			_List_Nil,
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env));
		var nmsg = _v0.a;
		var nenv = _v0.b;
		return _Utils_Tuple3(d, nmsg, nenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$displayStarterMenuAsRect = F2(
	function (env, d) {
		var model = function () {
			var _v0 = d.c5;
			if (_v0.$ === 12) {
				var starterMenuModel = _v0.a;
				return starterMenuModel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$nullModel;
			}
		}();
		var rulesX = model.cd.a - (model.a1.a / 2);
		var rulesY = model.cd.b - (model.a1.b / 2);
		var rulesID = A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			env.S.dq,
			_Utils_Tuple2(rulesX, rulesY),
			model.a1) ? 'button_rules_1' : 'button_rules_0';
		var startX = model.dL.a - (model.a1.a / 2);
		var startY = model.dL.b - (model.a1.b / 2);
		var startID = A3(
			$author$project$Lib$Coordinate$Coordinates$judgeMouseRect,
			env.S.dq,
			_Utils_Tuple2(startX, startY),
			model.a1) ? 'button_start_1' : 'button_start_0';
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
				]),
			_List_fromArray(
				[
					A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					_Utils_Tuple2(0, 0),
					_Utils_Tuple2(1920, 1080),
					'title_bg'),
					A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					_Utils_Tuple2(startX, startY),
					model.a1,
					startID),
					A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					_Utils_Tuple2(rulesX, rulesY),
					model.a1,
					rulesID)
				]));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$displayStarterMenuAsRect, env, d),
				100)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$initModel, env, i),
			dr: 'StarterMenu',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$AtkPotion = 4;
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreModel = function (a) {
	return {$: 7, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$LargeHealthPotion = 2;
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$MediumHealthPotion = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$Model = F3(
	function (items, itemStates, near) {
		return {bu: itemStates, bv: items, bR: near};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion = F2(
	function (price, potionType) {
		return {aE: potionType, b0: price};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$PotionItem = function (a) {
	return {$: 0, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$Selling = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$SmallHealthPotion = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$SpeedPotion = 3;
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$initStoreModel = F2(
	function (env, t) {
		var randomList = A3(
			$author$project$Lib$Tools$RNG$genRandomListInt,
			t,
			3,
			_Utils_Tuple2(1, 5));
		var potionList = A2(
			$elm$core$List$map,
			function (i) {
				switch (i) {
					case 1:
						return A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion, 20, 0);
					case 2:
						return A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion, 40, 1);
					case 3:
						return A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion, 80, 2);
					case 4:
						return A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion, 30, 3);
					case 5:
						return A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion, 40, 4);
					default:
						return A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Potion$Potion, 30, 3);
				}
			},
			randomList);
		var items = A2(
			$elm$core$List$map,
			function (potion) {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$PotionItem(potion);
			},
			potionList);
		return $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreModel(
			A3(
				$author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$Model,
				items,
				_List_fromArray(
					[0, 0, 0]),
				0));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$initModel = F2(
	function (env, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 9)) {
			var id = initData.a;
			var d = initData.b.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
				_Utils_Tuple2(8 * $author$project$MainConfig$tileSize, 6 * $author$project$MainConfig$tileSize))(d.bZ)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 5),
						_Utils_Tuple2(64, 118))
					]))($author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox)(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$initStoreModel, env, id))($author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$Bought = 1;
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$NullItem = {$: 1};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$AddBuffMsg = function (a) {
	return {$: 28, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$Heal = function (a) {
	return {$: 25, a: a};
};
var $author$project$SceneProtos$CoreEngine$LayerBase$IncreaseDamage = function (a) {
	return {$: 2, a: a};
};
var $author$project$SceneProtos$CoreEngine$LayerBase$SpeedUp = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$itemEffect = F2(
	function (env, item) {
		if (!item.$) {
			var potion = item.a;
			var nmsg = function () {
				var _v1 = potion.aE;
				switch (_v1) {
					case 0:
						return _List_fromArray(
							[
								_Utils_Tuple2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$Heal(10))
							]);
					case 1:
						return _List_fromArray(
							[
								_Utils_Tuple2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$Heal(30))
							]);
					case 2:
						return _List_fromArray(
							[
								_Utils_Tuple2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCByName('Player'),
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$Heal(70))
							]);
					case 3:
						return _List_fromArray(
							[
								_Utils_Tuple2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$AddBuffMsg(
									$author$project$SceneProtos$CoreEngine$LayerBase$SpeedUp(4000)))
							]);
					default:
						return _List_fromArray(
							[
								_Utils_Tuple2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$AddBuffMsg(
									$author$project$SceneProtos$CoreEngine$LayerBase$IncreaseDamage(6000)))
							]);
				}
			}();
			var c = env.bb;
			var nc = _Utils_update(
				c,
				{cR: c.cR - potion.b0});
			var nenv = _Utils_update(
				env,
				{bb: nc});
			return (nc.cR < 0) ? _Utils_Tuple2(_List_Nil, env) : _Utils_Tuple2(nmsg, nenv);
		} else {
			return _Utils_Tuple2(_List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$nullModel = {bu: _List_Nil, bv: _List_Nil, bR: 0};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					A2($elm$core$List$take, index, list),
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $elm_community$list_extra$List$Extra$setAt = F2(
	function (index, value) {
		return A2(
			$elm_community$list_extra$List$Extra$updateAt,
			index,
			$elm$core$Basics$always(value));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$updateModel = F2(
	function (env, d) {
		var model = function () {
			var _v3 = d.c5;
			if (_v3.$ === 7) {
				var store = _v3.a;
				return store;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$nullModel;
			}
		}();
		var _v0 = function () {
			var _v2 = model.bR;
			if (!_v2) {
				return _Utils_Tuple2(
					model,
					_Utils_Tuple2(_List_Nil, env));
			} else {
				var i = _v2;
				return ((!A2(
					$elm$core$Maybe$withDefault,
					1,
					A2($elm_community$list_extra$List$Extra$getAt, i - 1, model.bu))) && A2(
					$elm$core$Maybe$withDefault,
					false,
					A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_r, env.S.dd))) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bu: A3($elm_community$list_extra$List$Extra$setAt, i - 1, 1, model.bu)
						}),
					A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$itemEffect,
						env,
						A2(
							$elm$core$Maybe$withDefault,
							$author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$NullItem,
							A2($elm_community$list_extra$List$Extra$getAt, i - 1, model.bv)))) : _Utils_Tuple2(
					model,
					_Utils_Tuple2(_List_Nil, env));
			}
		}();
		var nmodel = _v0.a;
		var _v1 = _v0.b;
		var nmsg = _v1.a;
		var nenv = _v1.b;
		return _Utils_Tuple3(
			_Utils_update(
				d,
				{
					c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreModel(nmodel)
				}),
			nmsg,
			nenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$updateModelRec = F3(
	function (env, cmsg, d) {
		var omodel = function () {
			var _v1 = d.c5;
			if (_v1.$ === 7) {
				var store = _v1.a;
				return store;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$nullModel;
			}
		}();
		var nmodel = function () {
			if (cmsg.$ === 9) {
				var pos = cmsg.a;
				var near = (A2(
					$author$project$Lib$Coordinate$Coordinates$dist,
					pos,
					_Utils_Tuple2(d.bZ.a - (3 * $author$project$MainConfig$tileSize), d.bZ.b + (2 * $author$project$MainConfig$tileSize))) <= 90) ? 1 : ((A2(
					$author$project$Lib$Coordinate$Coordinates$dist,
					pos,
					_Utils_Tuple2(d.bZ.a, d.bZ.b + (2 * $author$project$MainConfig$tileSize))) <= 90) ? 2 : ((A2(
					$author$project$Lib$Coordinate$Coordinates$dist,
					pos,
					_Utils_Tuple2(d.bZ.a + (3 * $author$project$MainConfig$tileSize), d.bZ.b + (2 * $author$project$MainConfig$tileSize))) <= 90) ? 3 : 0));
				return _Utils_update(
					omodel,
					{bR: near});
			} else {
				return omodel;
			}
		}();
		var nd = _Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreModel(nmodel)
			});
		return _Utils_Tuple3(nd, _List_Nil, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$displayStoreMenu = F2(
	function (env, d) {
		var model = function () {
			var _v4 = d.c5;
			if (_v4.$ === 7) {
				var store = _v4.a;
				return store;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$nullModel;
			}
		}();
		var curState = A2(
			$elm$core$Maybe$withDefault,
			1,
			A2($elm_community$list_extra$List$Extra$getAt, model.bR - 1, model.bu));
		var cur = A2(
			$elm$core$Maybe$withDefault,
			$author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$NullItem,
			A2($elm_community$list_extra$List$Extra$getAt, model.bR - 1, model.bv));
		var _v0 = function () {
			var _v1 = _Utils_Tuple2(cur, curState);
			if ((!_v1.a.$) && (!_v1.b)) {
				var potion = _v1.a.a;
				var _v2 = _v1.b;
				var _v3 = potion.aE;
				switch (_v3) {
					case 0:
						return _Utils_Tuple3(
							'Small Health Potion',
							$elm$core$String$fromInt(potion.b0) + '$',
							'Heal 10 HP');
					case 1:
						return _Utils_Tuple3(
							'Medium Health Potion',
							$elm$core$String$fromInt(potion.b0) + '$',
							'Heal 30 HP');
					case 2:
						return _Utils_Tuple3(
							'Large Health Potion',
							$elm$core$String$fromInt(potion.b0) + '$',
							'Heal 70 HP');
					case 3:
						return _Utils_Tuple3(
							'Speed Potion',
							$elm$core$String$fromInt(potion.b0) + '$',
							'Increase running speed');
					default:
						return _Utils_Tuple3(
							'Attack Potion',
							$elm$core$String$fromInt(potion.b0) + '$',
							'Increase player atk');
				}
			} else {
				return _Utils_Tuple3('', '', '');
			}
		}();
		var title = _v0.a;
		var price = _v0.b;
		var info = _v0.c;
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			_Utils_eq(cur, $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$NullItem) ? _List_Nil : _List_fromArray(
				[
					A6(
					$author$project$Lib$Render$Text$renderTextWithColor,
					env.S,
					40,
					title,
					'disposabledroid_bbregular',
					$avh4$elm_color$Color$white,
					A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
						env,
						_Utils_Tuple2((d.bZ.a - (4 * $author$project$MainConfig$tileSize)) + 40, (d.bZ.b - (3 * $author$project$MainConfig$tileSize)) + 30))),
					A6(
					$author$project$Lib$Render$Text$renderTextWithColor,
					env.S,
					30,
					price,
					'disposabledroid_bbregular',
					$avh4$elm_color$Color$white,
					A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
						env,
						_Utils_Tuple2((d.bZ.a - (4 * $author$project$MainConfig$tileSize)) + 40, (d.bZ.b - (2 * $author$project$MainConfig$tileSize)) + 20))),
					A6(
					$author$project$Lib$Render$Text$renderTextWithColor,
					env.S,
					30,
					info,
					'disposabledroid_bbregular',
					$avh4$elm_color$Color$white,
					A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
						env,
						_Utils_Tuple2((d.bZ.a - (4 * $author$project$MainConfig$tileSize)) + 40, d.bZ.b - (1 * $author$project$MainConfig$tileSize))))
				]));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$displayStore = F2(
	function (env, d) {
		var model = function () {
			var _v4 = d.c5;
			if (_v4.$ === 7) {
				var store = _v4.a;
				return store;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Store$Base$nullModel;
			}
		}();
		var _v0 = d.bZ;
		var storex = _v0.a;
		var storey = _v0.b;
		var items = A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, item) {
					var _v1 = A2(
						$elm$core$Maybe$withDefault,
						1,
						A2($elm_community$list_extra$List$Extra$getAt, i, model.bu));
					if (!_v1) {
						if (!item.$) {
							var potion = item.a;
							var _v3 = potion.aE;
							switch (_v3) {
								case 0:
									return A5(
										$author$project$Lib$Render$Sprite$renderSprite,
										env.S,
										_List_Nil,
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
											env,
											_Utils_Tuple2((storex - (4 * $author$project$MainConfig$tileSize)) + ((i * 3) * $author$project$MainConfig$tileSize), storey)),
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
											env,
											_Utils_Tuple2(2 * $author$project$MainConfig$tileSize, 2 * $author$project$MainConfig$tileSize)),
										'small_health_potion');
								case 1:
									return A5(
										$author$project$Lib$Render$Sprite$renderSprite,
										env.S,
										_List_Nil,
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
											env,
											_Utils_Tuple2((storex - (4 * $author$project$MainConfig$tileSize)) + ((i * 3) * $author$project$MainConfig$tileSize), storey)),
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
											env,
											_Utils_Tuple2(2 * $author$project$MainConfig$tileSize, 2 * $author$project$MainConfig$tileSize)),
										'medium_health_potion');
								case 2:
									return A5(
										$author$project$Lib$Render$Sprite$renderSprite,
										env.S,
										_List_Nil,
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
											env,
											_Utils_Tuple2((storex - (4 * $author$project$MainConfig$tileSize)) + ((i * 3) * $author$project$MainConfig$tileSize), storey)),
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
											env,
											_Utils_Tuple2(2 * $author$project$MainConfig$tileSize, 2 * $author$project$MainConfig$tileSize)),
										'large_health_potion');
								case 3:
									return A5(
										$author$project$Lib$Render$Sprite$renderSprite,
										env.S,
										_List_Nil,
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
											env,
											_Utils_Tuple2((storex - (4 * $author$project$MainConfig$tileSize)) + ((i * 3) * $author$project$MainConfig$tileSize), storey)),
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
											env,
											_Utils_Tuple2(2 * $author$project$MainConfig$tileSize, 2 * $author$project$MainConfig$tileSize)),
										'speed_potion');
								default:
									return A5(
										$author$project$Lib$Render$Sprite$renderSprite,
										env.S,
										_List_Nil,
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
											env,
											_Utils_Tuple2((storex - (4 * $author$project$MainConfig$tileSize)) + ((i * 3) * $author$project$MainConfig$tileSize), storey)),
										A2(
											$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
											env,
											_Utils_Tuple2(2 * $author$project$MainConfig$tileSize, 2 * $author$project$MainConfig$tileSize)),
										'atk_potion');
							}
						} else {
							return $linsyking$elm_canvas$Canvas$empty;
						}
					} else {
						return $linsyking$elm_canvas$Canvas$empty;
					}
				}),
			model.bv);
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
				]),
			A2(
				$elm$core$List$cons,
				A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
						env,
						_Utils_Tuple2(storex - (4 * $author$project$MainConfig$tileSize), storey - (3 * $author$project$MainConfig$tileSize))),
					A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
						env,
						_Utils_Tuple2(8 * $author$project$MainConfig$tileSize, 6 * $author$project$MainConfig$tileSize)),
					'store'),
				A2(
					$elm$core$List$cons,
					A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$displayStoreMenu, env, d),
					items)));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$displayStore, env, d),
				1)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Store$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$initModel, env, i),
			dr: 'Store',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Store$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreMenuModel = function (a) {
	return {$: 8, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$Model = F2(
	function (price, effect) {
		return {bg: effect, b0: price};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Base$nullModel = {
	b$: _List_fromArray(
		[
			A2($author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$Model, 100, 15),
			A2($author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$Model, 10, 25)
		])
};
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 8)) {
			var id = initData.a;
			var d = initData.b.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(d.ag)(d.bZ)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 5),
						_Utils_Tuple2(64, 118))
					]))($author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox)(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreMenuModel($author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Base$nullModel))($author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$Lib$Tools$KeyCode$key_c = 67;
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$updateModel = F2(
	function (env, d) {
		var model = function () {
			var _v3 = d.c5;
			if (_v3.$ === 8) {
				var storeMenu = _v3.a;
				return storeMenu;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Base$nullModel;
			}
		}();
		var gd = env.S;
		var _v0 = d.ag;
		var sizex = _v0.a;
		var sizey = _v0.b;
		var _v1 = _Utils_Tuple2(0.2 * sizex, 0.5 * sizey);
		var weaponSizex = _v1.a;
		var weaponSizey = _v1.b;
		var _v2 = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_c, env.S.de)) ? _Utils_Tuple2(
			_List_Nil,
			_Utils_update(
				d,
				{
					dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
				})) : _Utils_Tuple2(_List_Nil, d);
		var gcmsg = _v2.a;
		var nd = _v2.b;
		return _Utils_Tuple3(nd, gcmsg, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPotionInitMsg = function (a) {
	return {$: 12, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$PotionInit = F2(
	function (price, effect) {
		return {bg: effect, b0: price};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(
			d,
			_List_fromArray(
				[
					_Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPotionInitMsg(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$PotionInit, 100, 15)))
				]),
			env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$nullModel = A2($author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$Model, 0, 0);
var $avh4$elm_color$Color$yellow = A4($avh4$elm_color$Color$RgbaSpace, 237 / 255, 212 / 255, 0 / 255, 1.0);
var $author$project$SceneProtos$CoreEngine$GameComponents$Potion$Model$displayPotion = F2(
	function (env, d) {
		var omodel = function () {
			var _v2 = d.c5;
			if (_v2.$ === 9) {
				var potion = _v2.a;
				return potion;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Potion$Base$nullModel;
			}
		}();
		var potionText = $elm$core$String$fromInt(omodel.b0);
		var _v0 = d.ag;
		var sizex = _v0.a;
		var sizey = _v0.b;
		var camSize = _Utils_Tuple2(sizex, sizey);
		var _v1 = d.bZ;
		var posx = _v1.a;
		var posy = _v1.b;
		var camPos = _Utils_Tuple2(
			posx - $elm$core$Basics$round(sizex / 2),
			posy + $elm$core$Basics$round(sizey / 2));
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$linsyking$elm_canvas$Canvas$shapes,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$yellow)
						]),
					_List_fromArray(
						[
							A3($author$project$Lib$Render$Shape$rect, env.S, camPos, camSize)
						])),
					A5($author$project$Lib$Render$Text$renderText, env.S, 40, 'Potion Details \n hp:' + potionText, 'Times New Roman', camPos)
				]));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$displayStoreMenu = F2(
	function (env, d) {
		var _v0 = d.ag;
		var sizex = _v0.a;
		var sizey = _v0.b;
		var camSize = A2(
			$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
			env,
			_Utils_Tuple2(sizex, sizey));
		var _v1 = d.bZ;
		var posx = _v1.a;
		var posy = _v1.b;
		var camPos = A2(
			$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
			env,
			_Utils_Tuple2(
				posx - $elm$core$Basics$round(sizex / 2),
				posy + $elm$core$Basics$round(sizey / 2)));
		var _v2 = d.dg;
		if (!_v2.$) {
			return A2(
				$linsyking$elm_canvas$Canvas$group,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$linsyking$elm_canvas$Canvas$shapes,
						_List_fromArray(
							[
								$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$yellow)
							]),
						_List_fromArray(
							[
								A3($author$project$Lib$Render$Shape$rect, env.S, camPos, camSize)
							]))
					]));
		} else {
			return A2(
				$linsyking$elm_canvas$Canvas$group,
				_List_Nil,
				_List_fromArray(
					[
						A2($linsyking$elm_canvas$Canvas$shapes, _List_Nil, _List_Nil)
					]));
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$displayStoreMenu, env, d),
				1),
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Potion$Model$displayPotion, env, d),
				2)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$initModel, env, i),
			dr: 'StoreMenu',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel = function (a) {
	return {$: 11, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Stopped = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel = {
	aP: _Utils_Tuple2(600, 780),
	aQ: _Utils_Tuple2(670, 785),
	aV: _Utils_Tuple2(0, 0),
	aW: _Utils_Tuple2(1920, 1080),
	a_: _Utils_Tuple2(96, 96),
	a7: _List_fromArray(
		[
			_Utils_Tuple2(1396, 340),
			_Utils_Tuple2(1396, 520),
			_Utils_Tuple2(1396, 700),
			_Utils_Tuple2(1152, 340),
			_Utils_Tuple2(1152, 520),
			_Utils_Tuple2(1152, 700)
		]),
	a8: _Utils_Tuple2(128, 128),
	a9: _Utils_Tuple2(1350, 220),
	bo: 0,
	bp: _Utils_Tuple2(400, 800),
	bq: _Utils_Tuple2(240, 40),
	az: _List_Nil,
	aA: 1,
	bQ: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Stopped(2),
	b8: _Utils_Tuple2(376, 228),
	b9: _Utils_Tuple2(184, 52),
	co: _Utils_Tuple2(350, 780),
	cp: _Utils_Tuple2(420, 785)
};
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 1)) {
			var id = initData.a;
			var d = initData.b.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(
				_List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(0, 0))
					]))($author$project$SceneProtos$CoreEngine$GameComponent$Base$nullBox)(0)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
					_Utils_update(
						$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel,
						{bo: d.bo, az: d.az, aA: d.aA})))($author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Moving = function (a) {
	return {$: 0, a: a};
};
var $author$project$Lib$Coordinate$Coordinates$distF = F2(
	function (_v0, _v1) {
		var x1 = _v0.a;
		var y1 = _v0.b;
		var x2 = _v1.a;
		var y2 = _v1.b;
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, x1 - x2, 2) + A2($elm$core$Basics$pow, y1 - y2, 2));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$updateState = function (_v0) {
	var d = _v0.a;
	var omsg = _v0.b;
	var env = _v0.c;
	var model = function () {
		var _v8 = d.c5;
		if (_v8.$ === 11) {
			var pauseMenu = _v8.a;
			return pauseMenu;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
		}
	}();
	var gd = env.S;
	var defc = $elm$core$Maybe$withDefault(3);
	var def = $elm$core$Maybe$withDefault(
		_Utils_Tuple2(0, 0));
	var _v1 = model.bQ;
	if (!_v1.$) {
		var _v2 = _v1.a;
		var _v3 = _v2.a;
		var fr = _v3.a;
		var to = _v3.b;
		var _v4 = _v2.b;
		var s1 = _v4.a;
		var p1x = _v4.b;
		var p1y = _v4.c;
		var _v5 = _v2.c;
		var s2 = _v5.a;
		var p2x = _v5.b;
		var p2y = _v5.c;
		var toPos = def(
			$elm$core$List$head(
				A2($elm$core$List$drop, to - 1, model.a7)));
		var rate = 1 / 6;
		var frPos = def(
			$elm$core$List$head(
				A2($elm$core$List$drop, fr - 1, model.a7)));
		return (A2(
			$author$project$Lib$Coordinate$Coordinates$distF,
			_Utils_Tuple2(p1x, p1y),
			toPos) <= 2) ? _Utils_Tuple3(
			((to >= 4) ? function (dd) {
				var _v7 = dd.c5;
				if (_v7.$ === 11) {
					var wmodel = _v7.a;
					return _Utils_update(
						dd,
						{
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
								_Utils_update(
									wmodel,
									{
										az: _Utils_ap(
											A2($elm$core$List$take, to - 4, model.az),
											_Utils_ap(
												_List_fromArray(
													[model.aA]),
												A2($elm$core$List$drop, to - 3, model.az))),
										aA: defc(
											$elm$core$List$head(
												A2($elm$core$List$drop, to - 4, model.az)))
									}))
						});
				} else {
					return dd;
				}
			} : function (dd) {
				return dd;
			})(
				function (dd) {
					var _v6 = dd.c5;
					if (_v6.$ === 11) {
						var wmodel = _v6.a;
						return _Utils_update(
							dd,
							{
								c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
									_Utils_update(
										wmodel,
										{
											bQ: (to >= 4) ? $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Stopped(fr) : $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Stopped(to)
										}))
							});
					} else {
						return dd;
					}
				}(d)),
			omsg,
			env) : _Utils_Tuple3(
			function (dd) {
				return _Utils_update(
					dd,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
							_Utils_update(
								model,
								{
									bQ: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Moving(
										_Utils_Tuple3(
											_Utils_Tuple2(fr, to),
											_Utils_Tuple3(s1, p1x + ((toPos.a - frPos.a) * rate), p1y + ((toPos.b - frPos.b) * rate)),
											_Utils_Tuple3(s2, p2x + ((frPos.a - toPos.a) * rate), p2y + ((frPos.b - toPos.b) * rate))))
								}))
					});
			}(d),
			omsg,
			env);
	} else {
		var cur = _v1.a;
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_a, env.S.dd)) ? _Utils_Tuple3(
			function (dd) {
				return _Utils_update(
					dd,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
							_Utils_update(
								model,
								{
									bQ: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Moving(
										_Utils_Tuple3(
											_Utils_Tuple2(cur, cur + 3),
											_Utils_Tuple3(
												model.aA,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).b),
											_Utils_Tuple3(
												defc(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.az))),
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur + 3) - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur + 3) - 1, model.a7))).b)))
								}))
					});
			}(d),
			omsg,
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_a, false, env.S.dd)
								});
						}(e.S)
					});
			}(env)) : (A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_d, env.S.dd)) ? _Utils_Tuple3(
			function (dd) {
				return _Utils_update(
					dd,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
							_Utils_update(
								model,
								{
									bQ: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Moving(
										_Utils_Tuple3(
											_Utils_Tuple2(cur, cur + 3),
											_Utils_Tuple3(
												model.aA,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).b),
											_Utils_Tuple3(
												defc(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.az))),
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur + 3) - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur + 3) - 1, model.a7))).b)))
								}))
					});
			}(d),
			omsg,
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_d, false, env.S.dd)
								});
						}(e.S)
					});
			}(env)) : ((A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_w, env.S.dd)) && (cur >= 2)) ? _Utils_Tuple3(
			function (dd) {
				return _Utils_update(
					dd,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
							_Utils_update(
								model,
								{
									bQ: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Moving(
										_Utils_Tuple3(
											_Utils_Tuple2(cur, cur - 1),
											_Utils_Tuple3(
												model.aA,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).b),
											_Utils_Tuple3(
												3,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur - 1) - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur - 1) - 1, model.a7))).b)))
								}))
					});
			}(d),
			omsg,
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_w, false, env.S.dd)
								});
						}(e.S)
					});
			}(env)) : ((A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_s, env.S.dd)) && (cur <= 2)) ? _Utils_Tuple3(
			function (dd) {
				return _Utils_update(
					dd,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuModel(
							_Utils_update(
								model,
								{
									bQ: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$Moving(
										_Utils_Tuple3(
											_Utils_Tuple2(cur, cur + 1),
											_Utils_Tuple3(
												model.aA,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, cur - 1, model.a7))).b),
											_Utils_Tuple3(
												3,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur + 1) - 1, model.a7))).a,
												def(
													$elm$core$List$head(
														A2($elm$core$List$drop, (cur + 1) - 1, model.a7))).b)))
								}))
					});
			}(d),
			omsg,
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_s, false, env.S.dd)
								});
						}(e.S)
					});
			}(env)) : _Utils_Tuple3(d, omsg, env))));
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$updateModel = F2(
	function (env, d) {
		var model = function () {
			var _v3 = d.c5;
			if (_v3.$ === 11) {
				var pauseMenu = _v3.a;
				return pauseMenu;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
			}
		}();
		var gd = env.S;
		var _v0 = gd.dp ? (A3($author$project$Lib$Coordinate$Coordinates$judgeMouseRect, gd.dq, model.b8, model.b9) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{dp: false});
						}(e.S)
					});
			}(env)) : _Utils_Tuple2(_List_Nil, env)) : _Utils_Tuple2(_List_Nil, env);
		var nmsg = _v0.a;
		var nenv = _v0.b;
		var _v1 = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$escape, env.S.dd)) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$escape, false, env.S.dd)
								});
						}(e.S)
					});
			}(nenv)) : _Utils_Tuple2(_List_Nil, nenv);
		var pmsg = _v1.a;
		var penv = _v1.b;
		var _v2 = A2(
			$elm$core$Maybe$withDefault,
			false,
			A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$key_e, env.S.dd)) ? _Utils_Tuple2(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg)
				]),
			function (e) {
				return _Utils_update(
					e,
					{
						S: function (gdd) {
							return _Utils_update(
								gdd,
								{
									dd: A3($elm$core$Array$set, $author$project$Lib$Tools$KeyCode$key_e, false, env.S.dd)
								});
						}(e.S)
					});
			}(penv)) : _Utils_Tuple2(_List_Nil, penv);
		var emsg = _v2.a;
		var eenv = _v2.b;
		return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$updateState(
			_Utils_Tuple3(
				d,
				_Utils_ap(
					nmsg,
					_Utils_ap(pmsg, emsg)),
				eenv));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$updateModelRec = F3(
	function (env, _v0, d) {
		return _Utils_Tuple3(d, _List_Nil, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$upgSprite = function (upg) {
	switch (upg) {
		case 0:
			return 'chip_doubletrigger';
		case 1:
			return 'chip_scatter';
		case 2:
			return 'chip_splash';
		default:
			return 'chip_empty';
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$renderInstalled = F2(
	function (env, d) {
		var withOut = F2(
			function (n, ls) {
				return _Utils_ap(
					A2($elm$core$List$take, n - 1, ls),
					A2($elm$core$List$drop, n, ls));
			});
		var model = function () {
			var _v3 = d.c5;
			if (_v3.$ === 11) {
				var wmodel = _v3.a;
				return wmodel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
			}
		}();
		var def = $elm$core$Maybe$withDefault(
			_Utils_Tuple2(0, 0));
		var als = A3(
			$elm$core$List$map2,
			F2(
				function (pos, upg) {
					return A5(
						$author$project$Lib$Render$Sprite$renderSprite,
						env.S,
						_List_Nil,
						pos,
						model.a8,
						$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$upgSprite(upg));
				}),
			A2($elm$core$List$drop, 3, model.a7),
			model.az);
		var _v0 = model.bQ;
		if (_v0.$ === 1) {
			return als;
		} else {
			var _v1 = _v0.a;
			var _v2 = _v1.a;
			var fr = _v2.a;
			var to = _v2.b;
			return A2(withOut, to - 3, als);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$renderInstalling = F2(
	function (env, d) {
		var model = function () {
			var _v5 = d.c5;
			if (_v5.$ === 11) {
				var wmodel = _v5.a;
				return wmodel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
			}
		}();
		var def = $elm$core$Maybe$withDefault(
			_Utils_Tuple2(0, 0));
		var _v0 = model.bQ;
		if (_v0.$ === 1) {
			var t = _v0.a;
			return (model.aA !== 3) ? _List_fromArray(
				[
					A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_Nil,
					def(
						$elm$core$List$head(
							A2($elm$core$List$drop, t - 1, model.a7))),
					model.a8,
					$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$upgSprite(model.aA))
				]) : _List_Nil;
		} else {
			var _v1 = _v0.a;
			var _v2 = _v1.a;
			var fr = _v2.a;
			var to = _v2.b;
			var _v3 = _v1.b;
			var s1 = _v3.a;
			var p1x = _v3.b;
			var p1y = _v3.c;
			var _v4 = _v1.c;
			var s2 = _v4.a;
			var p2x = _v4.b;
			var p2y = _v4.c;
			return _Utils_ap(
				(s1 !== 3) ? _List_fromArray(
					[
						A5(
						$author$project$Lib$Render$Sprite$renderSprite,
						env.S,
						_List_Nil,
						_Utils_Tuple2(p1x, p1y),
						model.a8,
						$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$upgSprite(s1))
					]) : _List_Nil,
				(to >= 4) ? _List_fromArray(
					[
						A5(
						$author$project$Lib$Render$Sprite$renderSprite,
						env.S,
						_List_Nil,
						_Utils_Tuple2(p2x, p2y),
						model.a8,
						$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$upgSprite(s2))
					]) : _List_Nil);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$renderPotion = F2(
	function (env, d) {
		var spdP = A3(
			$elm$core$List$foldl,
			F2(
				function (b, res) {
					if (b.$ === 1) {
						var s = b.a;
						return A2($elm$core$Basics$max, res, s);
					} else {
						return res;
					}
				}),
			-1,
			env.bb.cN);
		var spdTxt = (spdP > 0) ? ($elm$core$String$fromInt((spdP / 60) | 0) + ' seconds') : 'NONE';
		var spdID = (spdP > 0) ? 'speed_potion' : 'speed_potion_none';
		var model = function () {
			var _v1 = d.c5;
			if (_v1.$ === 11) {
				var wmodel = _v1.a;
				return wmodel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
			}
		}();
		var atkP = A3(
			$elm$core$List$foldl,
			F2(
				function (b, res) {
					if (b.$ === 2) {
						var s = b.a;
						return A2($elm$core$Basics$max, res, s);
					} else {
						return res;
					}
				}),
			-1,
			env.bb.cN);
		var atkTxt = (atkP > 0) ? ($elm$core$String$fromInt((atkP / 60) | 0) + ' seconds') : 'NONE';
		var atkID = (atkP > 0) ? 'atk_potion' : 'atk_potion_none';
		return _List_fromArray(
			[
				A5($author$project$Lib$Render$Sprite$renderSprite, env.S, _List_Nil, model.co, model.a_, spdID),
				A6($author$project$Lib$Render$Text$renderTextWithColor, env.S, 36, 'Speed Potion', 'disposabledroid_bbregular', $avh4$elm_color$Color$white, model.cp),
				A6(
				$author$project$Lib$Render$Text$renderTextWithColor,
				env.S,
				36,
				spdTxt,
				'disposabledroid_bbregular',
				$avh4$elm_color$Color$white,
				_Utils_Tuple2(model.cp.a + 30, model.cp.b + 50)),
				A5($author$project$Lib$Render$Sprite$renderSprite, env.S, _List_Nil, model.aP, model.a_, atkID),
				A6($author$project$Lib$Render$Text$renderTextWithColor, env.S, 36, 'Damege Potion', 'disposabledroid_bbregular', $avh4$elm_color$Color$white, model.aQ),
				A6(
				$author$project$Lib$Render$Text$renderTextWithColor,
				env.S,
				36,
				atkTxt,
				'disposabledroid_bbregular',
				$avh4$elm_color$Color$white,
				_Utils_Tuple2(model.aQ.a + 30, model.aQ.b + 50))
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$displayUpgradeMenu = F2(
	function (env, d) {
		var model = function () {
			var _v0 = d.c5;
			if (_v0.$ === 11) {
				var wmodel = _v0.a;
				return wmodel;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
			}
		}();
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
				]),
			A2(
				$elm$core$List$cons,
				A5($author$project$Lib$Render$Sprite$renderSprite, env.S, _List_Nil, model.aV, model.aW, 'upgrade_menu'),
				_Utils_ap(
					A2($author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$renderInstalled, env, d),
					_Utils_ap(
						A2($author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$renderInstalling, env, d),
						A2($author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$renderPotion, env, d)))));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$displayUpgradeMenu, env, d),
				100)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$initModel, env, i),
			dr: 'UpgradeMenu',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel = function (a) {
	return {$: 3, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$initExtraData = $elm$core$Dict$fromList(_List_Nil);
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$Model = F9(
	function (dir, angle, atk, atkInterval, lastAtkTime, lastHitTime, atkType, weaponUpgrade, boundKey) {
		return {cI: angle, aO: atk, aR: atkInterval, aS: atkType, aZ: boundKey, bf: dir, bz: lastAtkTime, bB: lastHitTime, d4: weaponUpgrade};
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$WeaponUpgrade = F2(
	function (maxSlot, upgrades) {
		return {$7: maxSlot, d1: upgrades};
	});
var $author$project$Lib$Tools$KeyCode$key_f = 70;
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$initBoundKey = {cu: $author$project$Lib$Tools$KeyCode$key_f};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel = A9(
	$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$Model,
	1,
	0,
	8,
	60,
	-1000000,
	-1000000,
	1,
	A2(
		$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$WeaponUpgrade,
		2,
		_List_fromArray(
			[3, 3, 3])),
	$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$initBoundKey);
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$initModel = F2(
	function (_v0, initData) {
		if ((initData.$ === 15) && (initData.b.$ === 12)) {
			var id = initData.a;
			var d = initData.b.a;
			var gcWeaponNullModelWithAtkI = _Utils_update(
				$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel,
				{aR: d.aR, aS: d.aS});
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$Data(id)(d.ag)(d.bZ)(
				_Utils_Tuple2(0, 0))(
				_Utils_Tuple2(0, 1))(1)(_List_Nil)(
				A2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
					_Utils_Tuple2(0, 0),
					d.ag))(100)($author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive)(
				$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(gcWeaponNullModelWithAtkI))($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$initExtraData);
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$nullData;
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$scatterTaretPos = F2(
	function (_v0, _v1) {
		var sx = _v0.a;
		var sy = _v0.b;
		var ex = _v1.a;
		var ey = _v1.b;
		var _v2 = _Utils_Tuple2(ex - sx, ey - sy);
		var dx = _v2.a;
		var dy = _v2.b;
		return _Utils_Tuple2(
			_Utils_Tuple2(ex - (dy / 6), ey + (dx / 6)),
			_Utils_Tuple2(ex + (dy / 6), ey - (dx / 6)));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$scatterTaretPos4 = F2(
	function (_v0, _v1) {
		var sx = _v0.a;
		var sy = _v0.b;
		var ex = _v1.a;
		var ey = _v1.b;
		var _v2 = _Utils_Tuple2(ex - sx, ey - sy);
		var dx = _v2.a;
		var dy = _v2.b;
		return _Utils_Tuple2(
			_Utils_Tuple2(
				_Utils_Tuple2(ex - (dy / 4), ey + (dx / 4)),
				_Utils_Tuple2(ex + (dy / 4), ey - (dx / 4))),
			_Utils_Tuple2(
				_Utils_Tuple2(ex - (dy / 8), ey + (dx / 8)),
				_Utils_Tuple2(ex + (dy / 8), ey - (dx / 8))));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$scatterTaretPos6 = F2(
	function (_v0, _v1) {
		var sx = _v0.a;
		var sy = _v0.b;
		var ex = _v1.a;
		var ey = _v1.b;
		var _v2 = _Utils_Tuple2(ex - sx, ey - sy);
		var dx = _v2.a;
		var dy = _v2.b;
		return _Utils_Tuple3(
			_Utils_Tuple2(
				_Utils_Tuple2(ex - (dy / 3), ey + (dx / 3)),
				_Utils_Tuple2(ex + (dy / 3), ey - (dx / 3))),
			_Utils_Tuple2(
				_Utils_Tuple2(ex - ((dy / 9) * 2), ey + ((dx / 9) * 2)),
				_Utils_Tuple2(ex + ((dy / 9) * 2), ey - ((dx / 9) * 2))),
			_Utils_Tuple2(
				_Utils_Tuple2(ex - (dy / 9), ey + (dx / 9)),
				_Utils_Tuple2(ex + (dy / 9), ey - (dx / 9))));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$fireBullet = F4(
	function (env, fltPosition, mapPos, up) {
		var dmg = (!_Utils_eq(
			A2(
				$elm_community$list_extra$List$Extra$findIndex,
				function (b) {
					if (b.$ === 2) {
						return true;
					} else {
						return false;
					}
				},
				env.bb.cN),
			$elm$core$Maybe$Nothing)) ? 8 : 4;
		var initBullet = A7(
			$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$BulletInit,
			fltPosition,
			mapPos,
			20,
			_Utils_Tuple2(30, 20),
			$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet(0),
			dmg,
			0);
		var count = F2(
			function (ls, x) {
				return $elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (a) {
							return _Utils_eq(a, x);
						},
						ls));
			});
		var nBullet = function () {
			var _v1 = A2(count, up.d1, 1);
			switch (_v1) {
				case 1:
					var _v2 = A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$scatterTaretPos, fltPosition, mapPos);
					var ntarget1 = _v2.a;
					var ntarget2 = _v2.b;
					return _List_fromArray(
						[
							initBullet,
							_Utils_update(
							initBullet,
							{dR: ntarget1}),
							_Utils_update(
							initBullet,
							{dR: ntarget2})
						]);
				case 2:
					var _v3 = A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$scatterTaretPos4, fltPosition, mapPos);
					var _v4 = _v3.a;
					var ntarget1 = _v4.a;
					var ntarget2 = _v4.b;
					var _v5 = _v3.b;
					var ntarget3 = _v5.a;
					var ntarget4 = _v5.b;
					return _List_fromArray(
						[
							initBullet,
							_Utils_update(
							initBullet,
							{dR: ntarget1}),
							_Utils_update(
							initBullet,
							{dR: ntarget2}),
							_Utils_update(
							initBullet,
							{dR: ntarget3}),
							_Utils_update(
							initBullet,
							{dR: ntarget4})
						]);
				case 3:
					var _v6 = A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$scatterTaretPos6, fltPosition, mapPos);
					var _v7 = _v6.a;
					var ntarget1 = _v7.a;
					var ntarget2 = _v7.b;
					var _v8 = _v6.b;
					var ntarget3 = _v8.a;
					var ntarget4 = _v8.b;
					var _v9 = _v6.c;
					var ntarget5 = _v9.a;
					var ntarget6 = _v9.b;
					return _List_fromArray(
						[
							initBullet,
							_Utils_update(
							initBullet,
							{dR: ntarget1}),
							_Utils_update(
							initBullet,
							{dR: ntarget2}),
							_Utils_update(
							initBullet,
							{dR: ntarget3}),
							_Utils_update(
							initBullet,
							{dR: ntarget4}),
							_Utils_update(
							initBullet,
							{dR: ntarget5}),
							_Utils_update(
							initBullet,
							{dR: ntarget6})
						]);
				default:
					return _List_fromArray(
						[initBullet]);
			}
		}();
		var nBullet2 = function () {
			var _v0 = A2(count, up.d1, 0);
			switch (_v0) {
				case 1:
					var secondBullets = A2(
						$elm$core$List$map,
						function (bi) {
							return _Utils_update(
								bi,
								{be: 5});
						},
						nBullet);
					return _Utils_ap(nBullet, secondBullets);
				case 2:
					var thirdBullets = A2(
						$elm$core$List$map,
						function (bi) {
							return _Utils_update(
								bi,
								{be: 8});
						},
						nBullet);
					var secondBullets = A2(
						$elm$core$List$map,
						function (bi) {
							return _Utils_update(
								bi,
								{be: 4});
						},
						nBullet);
					return _Utils_ap(
						nBullet,
						_Utils_ap(secondBullets, thirdBullets));
				case 3:
					var thirdBullets = A2(
						$elm$core$List$map,
						function (bi) {
							return _Utils_update(
								bi,
								{be: 6});
						},
						nBullet);
					var secondBullets = A2(
						$elm$core$List$map,
						function (bi) {
							return _Utils_update(
								bi,
								{be: 3});
						},
						nBullet);
					var fourthBullets = A2(
						$elm$core$List$map,
						function (bi) {
							return _Utils_update(
								bi,
								{be: 9});
						},
						nBullet);
					return _Utils_ap(
						nBullet,
						_Utils_ap(
							secondBullets,
							_Utils_ap(thirdBullets, fourthBullets)));
				default:
					return nBullet;
			}
		}();
		var nBullet3 = A2(
			$elm$core$List$map,
			function (bi) {
				return A2($elm$core$List$member, 2, up.d1) ? _Utils_update(
					bi,
					{
						a$: $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet(1)
					}) : _Utils_update(
					bi,
					{
						a$: $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$PlayerBullet(0)
					});
			},
			nBullet2);
		var msgs = A2(
			$elm$core$List$map,
			function (bi) {
				return _Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent,
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCNewBulletMsg(bi));
			},
			nBullet3);
		return msgs;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$calculateAngle = F2(
	function (_v0, _v1) {
		var wx = _v0.a;
		var wy = _v0.b;
		var mx = _v1.a;
		var my = _v1.b;
		return A2($elm$core$Basics$atan2, my - wy, mx - wx);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$gcModelAngleUpdate = F3(
	function (env, d, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var omodel = function () {
			var _v3 = d.c5;
			if (_v3.$ === 3) {
				var weapon = _v3.a;
				return weapon;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
			}
		}();
		var camPos = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var posx = camPos.a;
		var posy = camPos.b;
		var _v1 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			env.S,
			_Utils_Tuple2(x, y));
		var nx = _v1.a;
		var ny = _v1.b;
		var _v2 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			env.S,
			_Utils_Tuple2(posx, posy));
		var npx = _v2.a;
		var npy = _v2.b;
		var nangle = A2(
			$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$calculateAngle,
			_Utils_Tuple2(nx, ny),
			_Utils_Tuple2(npx, npy));
		var nmodel = _Utils_update(
			omodel,
			{cI: nangle});
		var nd = _Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(nmodel)
			});
		return _Utils_Tuple2(nd, env);
	});
var $author$project$SceneProtos$CoreEngine$Camera$Camera$posInMap = F2(
	function (env, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var _v1 = A3(
			$elm$core$Tuple$mapBoth,
			$elm$core$Basics$toFloat,
			$elm$core$Basics$toFloat,
			_Utils_Tuple2(x, y));
		var fx = _v1.a;
		var fy = _v1.b;
		var _v2 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, env.bb.b.bZ);
		var cx = _v2.a;
		var cy = _v2.b;
		var _v3 = env.bb.b.ag;
		var cw = _v3.a;
		var ch = _v3.b;
		return _Utils_Tuple2(cx + (((fx / 1920) - 0.5) * cw), cy + (((fy / 1080) - 0.5) * ch));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$saberAngleUpdate = F2(
	function (env, d) {
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 3) {
				var weapon = _v0.a;
				return weapon;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
			}
		}();
		var t = env.Y - omodel.bz;
		var oangle = omodel.cI;
		var eps = 0.0001;
		var cd = omodel.aR / 3;
		var nangle = (_Utils_cmp(
			$elm$core$Basics$abs(oangle),
			$elm$core$Basics$pi / 2) < 1) ? ((_Utils_cmp(t, 0.3 * cd) < 0) ? A2($elm$core$Basics$min, oangle + (($elm$core$Basics$pi / 3) / (0.3 * cd)), ($elm$core$Basics$pi / 2) - eps) : ((_Utils_cmp(t, cd) < 0) ? A2($elm$core$Basics$max, oangle - ((($elm$core$Basics$pi * 2) / 3) / (0.7 * cd)), ((-$elm$core$Basics$pi) / 2) + eps) : oangle)) : ((_Utils_cmp(t, 0.3 * cd) < 0) ? function (a) {
			return ((a > 0) && (_Utils_cmp(a, $elm$core$Basics$pi / 2) < 0)) ? (($elm$core$Basics$pi / 2) + eps) : a;
		}(
			function (a) {
				return (_Utils_cmp(a, -$elm$core$Basics$pi) < 0) ? (a + ($elm$core$Basics$pi * 2)) : a;
			}(oangle - (($elm$core$Basics$pi / 3) / (0.3 * cd)))) : ((_Utils_cmp(t, cd) < 0) ? function (a) {
			return ((a < 0) && (_Utils_cmp(a, (-$elm$core$Basics$pi) / 2) > 0)) ? (((-$elm$core$Basics$pi) / 2) - eps) : a;
		}(
			function (a) {
				return (_Utils_cmp(a, $elm$core$Basics$pi) > 0) ? (a - ($elm$core$Basics$pi * 2)) : a;
			}(oangle + ((($elm$core$Basics$pi * 2) / 3) / (0.7 * cd)))) : oangle));
		var nmodel = _Utils_update(
			omodel,
			{cI: nangle});
		var nd = _Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(nmodel)
			});
		var camPos = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var posx = camPos.a;
		var posy = camPos.b;
		return _Utils_Tuple2(nd, env);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$PlayerWinMsg = {$: 35};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$Saber = 0;
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updateSwitch = function (_v0) {
	var d = _v0.a;
	var ls = _v0.b;
	var env = _v0.c;
	var omodel = function () {
		var _v4 = d.c5;
		if (_v4.$ === 3) {
			var model = _v4.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
		}
	}();
	var kl = env.S.dd;
	var count = F2(
		function (llls, x) {
			return $elm$core$List$length(
				A2(
					$elm$core$List$filter,
					function (a) {
						return _Utils_eq(a, x);
					},
					llls));
		});
	var edMsg = ((A2(count, omodel.d4.d1, 0) >= 1) && ((A2(count, omodel.d4.d1, 1) >= 1) && ((A2(count, omodel.d4.d1, 2) >= 1) && (($elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (a) {
				if (a.$ === 2) {
					return true;
				} else {
					return false;
				}
			},
			env.bb.cN)) >= 1) && ($elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (a) {
				if (a.$ === 1) {
					return true;
				} else {
					return false;
				}
			},
			env.bb.cN)) >= 1))))) ? _List_fromArray(
		[
			_Utils_Tuple2($author$project$SceneProtos$CoreEngine$GameComponent$Base$GCParent, $author$project$SceneProtos$CoreEngine$GameComponent$Base$PlayerWinMsg)
		]) : _List_Nil;
	var bk = omodel.aZ;
	var _v1 = A2(
		$elm$core$Maybe$withDefault,
		false,
		A2($elm$core$Array$get, bk.cu, kl)) ? _Utils_Tuple2(
		(omodel.aS === 1) ? _Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(
					_Utils_update(
						omodel,
						{aR: 20, aS: 0})),
				cl: A2(
					$author$project$SceneProtos$CoreEngine$GameComponent$Base$Box,
					_Utils_Tuple2(0, 0),
					_Utils_Tuple2(140, 20)),
				ag: _Utils_Tuple2(140, 20)
			}) : _Utils_update(
			d,
			{
				c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(
					_Utils_update(
						omodel,
						{aR: 15, aS: 1})),
				ag: _Utils_Tuple2(70 * 1.6, 24 * 1.6)
			}),
		function (e) {
			return _Utils_update(
				e,
				{
					S: function (gd) {
						return _Utils_update(
							gd,
							{
								dd: A3($elm$core$Array$set, bk.cu, false, kl)
							});
					}(e.S)
				});
		}(env)) : _Utils_Tuple2(d, env);
	var nd = _v1.a;
	var nenv = _v1.b;
	return _Utils_Tuple3(
		nd,
		_Utils_ap(ls, edMsg),
		nenv);
};
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updateModel = F2(
	function (env, d) {
		var omodel = function () {
			var _v6 = d.c5;
			if (_v6.$ === 3) {
				var weapon = _v6.a;
				return weapon;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
			}
		}();
		var gd = env.S;
		var pos = gd.dq;
		var mapPos = A2(
			$author$project$SceneProtos$CoreEngine$Camera$Camera$posInMap,
			env,
			A3($elm$core$Tuple$mapBoth, $elm$core$Basics$round, $elm$core$Basics$round, pos));
		var _v0 = function () {
			var _v1 = omodel.aS;
			if (_v1 === 1) {
				return A3($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$gcModelAngleUpdate, env, d, pos);
			} else {
				return (_Utils_cmp(env.Y - omodel.bz, (omodel.aR / 2) | 0) > 0) ? A3($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$gcModelAngleUpdate, env, d, pos) : A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$saberAngleUpdate, env, d);
			}
		}();
		var nd = _v0.a;
		var nenv = _v0.b;
		var model = function () {
			var _v5 = nd.c5;
			if (_v5.$ === 3) {
				var weapon = _v5.a;
				return weapon;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
			}
		}();
		var _v2 = function () {
			if (gd.dp) {
				var shotIntervalPossible = _Utils_cmp(env.Y - model.bz, model.aR) > 0;
				var fltPosition = _Utils_Tuple2(d.bZ.a, d.bZ.b);
				return shotIntervalPossible ? ((model.aS === 1) ? _Utils_Tuple2(
					A4($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$fireBullet, env, fltPosition, mapPos, model.d4),
					_Utils_update(
						nd,
						{
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(
								_Utils_update(
									model,
									{bz: env.Y}))
						})) : _Utils_Tuple2(
					_List_Nil,
					_Utils_update(
						nd,
						{
							c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(
								_Utils_update(
									model,
									{bz: env.Y}))
						}))) : _Utils_Tuple2(_List_Nil, nd);
			} else {
				return _Utils_Tuple2(_List_Nil, nd);
			}
		}();
		var gcmsg = _v2.a;
		var nnd = _v2.b;
		var nnenv = _Utils_update(
			nenv,
			{
				S: _Utils_update(
					gd,
					{dp: false})
			});
		var _v3 = function () {
			var _v4 = env.w;
			if (!_v4.$) {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updateSwitch(
					_Utils_Tuple3(nnd, gcmsg, nnenv));
			} else {
				return _Utils_Tuple3(nnd, gcmsg, nnenv);
			}
		}();
		var nnnd = _v3.a;
		var ngcmsg = _v3.b;
		var nnnenv = _v3.c;
		return _Utils_Tuple3(nnnd, ngcmsg, nnnenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$gcModelDirUpdate = F2(
	function (model, newDir) {
		if (model.$ === 3) {
			var weapon = model.a;
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(
				_Utils_update(
					weapon,
					{bf: newDir}));
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updatePos = F2(
	function (_v0, dir) {
		var x = _v0.a;
		var y = _v0.b;
		if (dir === 1) {
			return _Utils_Tuple2(x, y);
		} else {
			return _Utils_Tuple2(x, y);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updateModelRec = F3(
	function (env, gcmsg, d) {
		if (gcmsg.$ === 1) {
			var pos = gcmsg.a;
			var dir = gcmsg.b;
			return _Utils_Tuple3(
				_Utils_update(
					d,
					{
						c5: A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$gcModelDirUpdate, d.c5, dir),
						bZ: A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updatePos, pos, dir)
					}),
				_List_Nil,
				env);
		} else {
			return _Utils_Tuple3(d, _List_Nil, env);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$debug = F2(
	function (env, d) {
		var omodel = function () {
			var _v0 = d.c5;
			if (_v0.$ === 3) {
				var weapon = _v0.a;
				return weapon;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
			}
		}();
		return _List_Nil;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$transformWeapon = F2(
	function (env, d) {
		var rangle = function () {
			var _v1 = d.c5;
			if (_v1.$ === 3) {
				var weapon = _v1.a;
				return weapon.cI;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel.cI;
			}
		}();
		var camPos = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var x = camPos.a;
		var y = camPos.b;
		var _v0 = A2(
			$author$project$Lib$Coordinate$Coordinates$posToReal,
			env.S,
			_Utils_Tuple2(x, y));
		var nx = _v0.a;
		var ny = _v0.b;
		return $linsyking$elm_canvas$Canvas$Settings$Advanced$transform(
			_List_fromArray(
				[
					A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, nx, ny),
					$linsyking$elm_canvas$Canvas$Settings$Advanced$rotate(rangle),
					A2($linsyking$elm_canvas$Canvas$Settings$Advanced$translate, -nx, -ny)
				]));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$displayWeaponAsRect = F2(
	function (env, d) {
		var omodel = function () {
			var _v1 = d.c5;
			if (_v1.$ === 3) {
				var weapon = _v1.a;
				return weapon;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
			}
		}();
		var id = function () {
			var _v0 = omodel.aS;
			if (!_v0) {
				return 'saber';
			} else {
				return 'shooter';
			}
		}();
		var camSize = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam, env, d.ag);
		var x = camSize.a / 2;
		var y = camSize.b / 2;
		var camPos = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, d.bZ);
		var posx = camPos.a;
		var posy = camPos.b;
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_fromArray(
				[
					$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
				]),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$linsyking$elm_canvas$Canvas$group,
						_List_fromArray(
							[
								A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$transformWeapon, env, d)
							]),
						_List_fromArray(
							[
								A5(
								$author$project$Lib$Render$Sprite$renderSprite,
								env.S,
								_List_Nil,
								_Utils_Tuple2(posx - (2 * x), posy - y),
								camSize,
								id)
							]))
					]),
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$debug, env, d)));
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$viewModel = F2(
	function (env, d) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$displayWeaponAsRect, env, d),
				2)
			]);
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Export$initGC = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$initModel, env, i),
			dr: 'Weapon',
			d$: $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$isInCircle = F3(
	function (center, r, p) {
		return _Utils_cmp(
			A2($author$project$Lib$Coordinate$Coordinates$dist, center, p),
			r) < 1;
	});
var $author$project$Lib$Env$Env$noCommonData = function (env) {
	return {S: env.S, w: env.w, Y: env.Y};
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$partitionInstalledChip = function (objs) {
	var _v0 = A2(
		$elm$core$List$partition,
		function (obj) {
			return obj.dr === 'Weapon';
		},
		objs);
	var weapons = _v0.a;
	var _v1 = $elm$core$List$head(weapons);
	if (!_v1.$) {
		var w = _v1.a;
		var _v2 = w.cV.c5;
		if (_v2.$ === 3) {
			var wgc = _v2.a;
			return wgc.d4.d1;
		} else {
			return _List_Nil;
		}
	} else {
		return _List_Nil;
	}
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$searchNearestChip = function (objs) {
	var _v0 = A2(
		$elm$core$List$partition,
		function (obj) {
			return (obj.dr === 'Chip') && function () {
				var _v1 = obj.cV.c5;
				if (_v1.$ === 4) {
					var chip = _v1.a;
					var _v2 = chip.aK;
					if (!_v2.$) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}();
		},
		objs);
	var chips = _v0.a;
	var others = _v0.b;
	var _v3 = A2(
		$elm$core$List$partition,
		function (obj) {
			return obj.dr === 'Player';
		},
		objs);
	var player = _v3.a;
	var obj1 = _v3.b;
	var playerPos = function () {
		var _v8 = $elm$core$List$head(player);
		if (!_v8.$) {
			var p = _v8.a;
			return p.cV.bZ;
		} else {
			return _Utils_Tuple2(0, 0);
		}
	}();
	var _v4 = A2(
		$elm$core$Tuple$mapFirst,
		$elm$core$List$sortBy(
			function (chip) {
				return A2($author$project$Lib$Coordinate$Coordinates$dist, playerPos, chip.cV.bZ);
			}),
		A2(
			$elm$core$List$partition,
			function (chip) {
				return A3($author$project$SceneProtos$CoreEngine$GameLayer$Model$isInCircle, playerPos, $author$project$MainConfig$tileSize * 1.5, chip.cV.bZ);
			},
			chips));
	var hitChips = _v4.a;
	var noHitChips = _v4.b;
	var _v5 = $elm$core$List$head(hitChips);
	if (_v5.$ === 1) {
		return $elm$core$Maybe$Nothing;
	} else {
		var nearestHitChip = _v5.a;
		var _v6 = nearestHitChip.cV.c5;
		if (_v6.$ === 4) {
			var chip = _v6.a;
			var _v7 = chip.aK;
			if (!_v7.$) {
				var c = _v7.a;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						c,
						_Utils_ap(
							others,
							_Utils_ap(
								A2($elm$core$List$drop, 1, hitChips),
								noHitChips))));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$SceneProtos$CoreEngine$Camera$Base$Shaking = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$shakeCam = F2(
	function (_v0, t) {
		var env = _v0.a;
		var model = _v0.b;
		var c = env.bb;
		var ocam = c.b;
		var ncam = _Utils_update(
			ocam,
			{
				a2: $author$project$SceneProtos$CoreEngine$Camera$Base$Shaking(t)
			});
		return _Utils_Tuple2(
			_Utils_update(
				env,
				{
					bb: _Utils_update(
						c,
						{b: ncam})
				}),
			model);
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$storeMenuUpdate = F2(
	function (objs, newStoreMenu) {
		var oldObjs = A2(
			$elm$core$List$filter,
			function (x) {
				return x.dr !== 'StoreMenu';
			},
			objs);
		var newObjs = _Utils_ap(
			oldObjs,
			_List_fromArray(
				[newStoreMenu]));
		return newObjs;
	});
var $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$storyRoom = $author$project$Lib$Tools$ArrayTools$transpose(
	$tortus$elm_array_2d$Array2D$fromList(
		_List_fromArray(
			[
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[99, 41, 45, 47, 43, 3, 27, 57, 59, 19, 57, 59, 45, 47, 57, 59, 3, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 55, 21, 23, 25, 21, 3, 3, 27, 57, 59, 19, 101, 55, 39, 99, 99, 41, 45, 47, 43, 3, 27, 57, 59, 19, 57, 59, 45, 47, 57, 59, 3, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 55, 21, 23, 25, 21, 3, 3, 27, 57, 59, 19, 101, 55, 39, 99, 99, 41, 45, 47, 43, 3, 27, 57, 59, 19, 57, 59, 45, 47, 57, 59, 3, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 55, 21, 23, 25, 21, 3, 3, 27, 57, 59, 19, 101, 55, 39, 99, 99, 41, 45, 47, 43, 3, 27, 57, 59, 19, 57, 59, 45, 47, 57, 59, 3, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 55, 21, 23, 25, 21, 3, 3, 27, 57, 59, 19, 101, 55, 39, 99, 99, 41, 45, 47, 43, 3, 27, 57, 59, 19, 57, 59, 45, 47, 57, 59, 3, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 55, 21, 23, 25, 21, 3, 3, 27, 57, 59, 19, 101, 55, 39, 99, 99, 41, 45, 47, 43, 3, 27, 57, 59, 19, 57, 59, 45, 47, 57, 59, 3, 57, 91, 91, 59, 57, 91, 91, 59, 57, 91, 91, 59, 55, 21, 23, 25, 21, 3, 3]),
				_List_fromArray(
				[2, 2, 49, 51, 2, 2, 2, 61, 63, 2, 61, 63, 49, 51, 61, 63, 2, 61, 2, 2, 63, 61, 2, 2, 63, 61, 2, 2, 63, 2, 2, 2, 2, 2, 2, 2, 2, 61, 63, 2, 105, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 61, 63, 2, 61, 63, 49, 51, 61, 63, 2, 61, 2, 2, 63, 61, 2, 2, 63, 61, 2, 2, 63, 2, 2, 2, 2, 2, 2, 2, 2, 61, 63, 2, 105, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 61, 63, 2, 61, 63, 49, 51, 61, 63, 2, 61, 2, 2, 63, 61, 2, 2, 63, 61, 2, 2, 63, 2, 2, 2, 2, 2, 2, 2, 2, 61, 63, 2, 105, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 61, 63, 2, 61, 63, 49, 51, 61, 63, 2, 61, 2, 2, 63, 61, 2, 2, 63, 61, 2, 2, 63, 2, 2, 2, 2, 2, 2, 2, 2, 61, 63, 2, 105, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 61, 63, 2, 61, 63, 49, 51, 61, 63, 2, 61, 2, 2, 63, 61, 2, 2, 63, 61, 2, 2, 63, 2, 2, 2, 2, 2, 2, 2, 2, 61, 63, 2, 105, 2, 2, 2, 2, 2, 49, 51, 2, 2, 2, 61, 63, 2, 61, 63, 49, 51, 61, 63, 2, 61, 2, 2, 63, 61, 2, 2, 63, 61, 2, 2, 63, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]),
				_List_fromArray(
				[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
			])));
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$upgradeWeapon = F3(
	function (env, upgradeMenu, objs) {
		var umodel = function () {
			var _v4 = upgradeMenu.cV.c5;
			if (_v4.$ === 11) {
				var um = _v4.a;
				return um;
			} else {
				return $author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Base$nullModel;
			}
		}();
		var _v0 = A2(
			$elm$core$List$partition,
			function (obj) {
				return obj.dr === 'Weapon';
			},
			objs);
		var weapons = _v0.a;
		var others = _v0.b;
		var nweapons = A2(
			$elm$core$List$map,
			function (weapon) {
				var d = weapon.cV;
				var wmodel = function () {
					var _v3 = d.c5;
					if (_v3.$ === 3) {
						var wm = _v3.a;
						return wm;
					} else {
						return $author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$nullModel;
					}
				}();
				var nmodel = _Utils_update(
					wmodel,
					{
						d4: function (wug) {
							return _Utils_update(
								wug,
								{d1: umodel.az});
						}(wmodel.d4)
					});
				var ndata = _Utils_update(
					d,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponModel(nmodel)
					});
				return _Utils_update(
					weapon,
					{cV: ndata});
			},
			weapons);
		var weaponPos = function () {
			var _v2 = $elm$core$List$head(nweapons);
			if (!_v2.$) {
				var w = _v2.a;
				return w.cV.bZ;
			} else {
				return _Utils_Tuple2(0, 0);
			}
		}();
		var nchip = function () {
			var _v1 = umodel.aA;
			if (_v1 === 3) {
				return _List_Nil;
			} else {
				return _List_fromArray(
					[
						A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Chip$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(
								_Utils_ap(nweapons, others)),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipInitData(
								{
									bZ: weaponPos,
									aK: $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$Chip(umodel.aA)
								})))
					]);
			}
		}();
		return _Utils_ap(
			nweapons,
			_Utils_ap(others, nchip));
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$handleComponentMsg = F3(
	function (env, msg, model) {
		if (env.S.dN === 1) {
			switch (msg.$) {
				case 19:
					var ogd = env.S;
					var objs = model.bS;
					var newgd = _Utils_update(
						ogd,
						{dN: 0});
					var nenv = _Utils_update(
						env,
						{S: newgd});
					var newobjs = function () {
						var _v1 = $elm$core$List$head(
							A2(
								$elm$core$List$partition,
								function (x) {
									return x.dr === 'UpgradeMenu';
								},
								objs).a);
						if (_v1.$ === 1) {
							return A2(
								$elm$core$List$filter,
								function (x) {
									return (x.dr !== 'PauseMenu') && (x.dr !== 'UpgradeMenu');
								},
								objs);
						} else {
							var upgradeMenu = _v1.a;
							return A3(
								$author$project$SceneProtos$CoreEngine$GameLayer$Model$upgradeWeapon,
								nenv,
								upgradeMenu,
								A2(
									$elm$core$List$filter,
									function (x) {
										return (x.dr !== 'PauseMenu') && (x.dr !== 'UpgradeMenu');
									},
									objs));
						}
					}();
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newobjs}),
						_List_Nil,
						nenv);
				case 20:
					var ogd = env.S;
					var objs = _List_fromArray(
						[
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								0,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuInitData($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$StarterMenuInit)))
						]);
					var newgd = _Utils_update(
						ogd,
						{dN: 0});
					var nenv = _Utils_update(
						env,
						{S: newgd});
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: objs}),
						_List_Nil,
						nenv);
				default:
					return _Utils_Tuple3(model, _List_Nil, env);
			}
		} else {
			switch (msg.$) {
				case 29:
					var oc = env.bb;
					var nc = _Utils_update(
						oc,
						{dT: $author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Room$storyRoom});
					return _Utils_Tuple3(
						model,
						_List_Nil,
						_Utils_update(
							env,
							{bb: nc}));
				case 32:
					var oc = env.bb;
					var nc = _Utils_update(
						oc,
						{dT: $tortus$elm_array_2d$Array2D$empty});
					return _Utils_Tuple3(
						model,
						_List_Nil,
						_Utils_update(
							env,
							{bb: nc}));
				case 28:
					var b = msg.a;
					var oc = env.bb;
					var nc = _Utils_update(
						oc,
						{
							cN: A2($elm$core$List$cons, b, oc.cN)
						});
					return _Utils_Tuple3(
						model,
						_List_Nil,
						_Utils_update(
							env,
							{bb: nc}));
				case 3:
					var bullet = msg.a;
					var objs = model.bS;
					var newBullet = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCBulletInitData(bullet)));
					var newObjs = _Utils_ap(
						objs,
						_List_fromArray(
							[newBullet]));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 4:
					var chip = msg.a;
					var objs = model.bS;
					var newChip = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Chip$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipInitData(chip)));
					var newObjs = _Utils_ap(
						objs,
						_List_fromArray(
							[newChip]));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 6:
					var p = msg.a;
					var objs = model.bS;
					var newPlayer = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Player$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							0,
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPlayerInitData(
								A2(
									$author$project$SceneProtos$CoreEngine$GameComponents$Player$Base$PlayerInit,
									p,
									_Utils_Tuple2(128, 128)))));
					var newObjs = A2($elm$core$List$cons, newPlayer, objs);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 26:
					var store = msg.a;
					var objs = model.bS;
					var newStore = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Store$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreInitData(store)));
					var newObjs = _Utils_ap(
						objs,
						_List_fromArray(
							[newStore]));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 7:
					var lsP = msg.a;
					var objs = model.bS;
					var newEnemy = A2(
						$elm$core$List$indexedMap,
						F2(
							function (t, _v3) {
								var pos = _v3.dt;
								var typeId = _v3.d_;
								return A2(
									$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Export$initGC,
									$author$project$Lib$Env$Env$noCommonData(env),
									A2(
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
										$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(objs) + t,
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnemyInitData(
											A5(
												$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyInit,
												pos,
												_Utils_Tuple2(128, 128),
												1,
												typeId,
												1))));
							}),
						lsP);
					var newObjs = _Utils_ap(newEnemy, objs);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 10:
					var storeMenu = msg.a;
					var objs = model.bS;
					var newStoreMenu = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$StoreMenu$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStoreMenuInitData(storeMenu)));
					var newObjs = A2($author$project$SceneProtos$CoreEngine$GameLayer$Model$storeMenuUpdate, objs, newStoreMenu);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 16:
					var center = msg.a;
					var r = msg.b;
					var _v4 = A2(
						$elm$core$List$partition,
						function (obj) {
							return obj.dr === 'Enemy';
						},
						model.bS);
					var enemies = _v4.a;
					var others = _v4.b;
					var _v5 = A2(
						$elm$core$List$partition,
						function (enemy) {
							return A3($author$project$SceneProtos$CoreEngine$GameLayer$Model$isInCircle, center, r, enemy.cV.bZ);
						},
						enemies);
					var hitEnemies = _v5.a;
					var noHitEnemies = _v5.b;
					var nEnemies = A2(
						$elm$core$List$map,
						function (enemy) {
							var d = enemy.cV;
							var hp = d.bo;
							var nhp = hp - 3;
							var ndata = (nhp <= 0) ? (_Utils_eq(d.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive) ? _Utils_update(
								d,
								{
									bo: nhp,
									dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
								}) : _Utils_update(
								d,
								{bo: nhp})) : _Utils_update(
								d,
								{bo: nhp});
							return _Utils_update(
								enemy,
								{cV: ndata});
						},
						hitEnemies);
					var nobj = _Utils_ap(
						others,
						_Utils_ap(noHitEnemies, nEnemies));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: nobj}),
						_List_Nil,
						env);
				case 17:
					var t = msg.a;
					var _v6 = A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$shakeCam,
						_Utils_Tuple2(env, model),
						t);
					var nenv = _v6.a;
					var nmodel = _v6.b;
					return _Utils_Tuple3(nmodel, _List_Nil, nenv);
				case 33:
					var _v7 = A2(
						$author$project$SceneProtos$CoreEngine$Camera$Camera$shakeCam,
						_Utils_Tuple2(env, model),
						0);
					var nenv = _v7.a;
					var nmodel = _v7.b;
					return _Utils_Tuple3(nmodel, _List_Nil, nenv);
				case 34:
					var objs = model.bS;
					var newEnder = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Ender$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnderInitData(
								{aK: 0})));
					var newObjs = _Utils_ap(
						objs,
						_List_fromArray(
							[newEnder]));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 35:
					var objs = model.bS;
					var newEnder = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$Ender$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCEnderInitData(
								{aK: 1})));
					var newObjs = _Utils_ap(
						objs,
						_List_fromArray(
							[newEnder]));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						env);
				case 18:
					var ogd = env.S;
					var objs = model.bS;
					var newState = $author$project$SceneProtos$CoreEngine$GameLayer$Model$changeState(ogd.dN);
					var ngd = _Utils_update(
						ogd,
						{dN: newState});
					var newPauseMenu = A2(
						$author$project$SceneProtos$CoreEngine$GameComponents$PauseMenu$Export$initGC,
						$author$project$Lib$Env$Env$noCommonData(env),
						A2(
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
							$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
							$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCPauseMenuInitData(
								{})));
					var newObjs = _Utils_ap(
						objs,
						_List_fromArray(
							[newPauseMenu]));
					var nenv = _Utils_update(
						env,
						{S: ngd});
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						nenv);
				case 24:
					var playerHp = msg.a;
					var ogd = env.S;
					var objs = model.bS;
					var newState = $author$project$SceneProtos$CoreEngine$GameLayer$Model$changeState(ogd.dN);
					var ngd = _Utils_update(
						ogd,
						{dN: newState});
					var _v8 = function () {
						var _v9 = $author$project$SceneProtos$CoreEngine$GameLayer$Model$searchNearestChip(objs);
						if (!_v9.$) {
							var _v10 = _v9.a;
							var nearestChip = _v10.a;
							var nobjs = _v10.b;
							return _Utils_Tuple2(
								_Utils_ap(
									nobjs,
									_List_fromArray(
										[
											A2(
											$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Export$initGC,
											$author$project$Lib$Env$Env$noCommonData(env),
											A2(
												$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
												$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
												$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuInitData(
													{
														bo: playerHp,
														az: $author$project$SceneProtos$CoreEngine$GameLayer$Model$partitionInstalledChip(objs),
														aA: nearestChip
													})))
										])),
								_Utils_update(
									env,
									{S: ngd}));
						} else {
							return _Utils_Tuple2(
								_Utils_ap(
									objs,
									_List_fromArray(
										[
											A2(
											$author$project$SceneProtos$CoreEngine$GameComponents$UpgradeMenu$Export$initGC,
											$author$project$Lib$Env$Env$noCommonData(env),
											A2(
												$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
												$author$project$SceneProtos$CoreEngine$GameLayer$Model$genUID(model.bS),
												$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCUpgradeMenuInitData(
													{
														bo: playerHp,
														az: $author$project$SceneProtos$CoreEngine$GameLayer$Model$partitionInstalledChip(objs),
														aA: 3
													})))
										])),
								_Utils_update(
									env,
									{S: ngd}));
						}
					}();
					var newObjs = _v8.a;
					var nenv = _v8.b;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newObjs}),
						_List_Nil,
						nenv);
				case 19:
					var ogd = env.S;
					var objs = model.bS;
					var newobjs = A2(
						$elm$core$List$filter,
						function (x) {
							return (x.dr !== 'PauseMenu') && (x.dr !== 'UpgradeMenu');
						},
						objs);
					var newgd = _Utils_update(
						ogd,
						{dN: 0});
					var nenv = _Utils_update(
						env,
						{S: newgd});
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: newobjs}),
						_List_Nil,
						nenv);
				case 21:
					var objs = model.bS;
					var nmap = _List_fromArray(
						[
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								1,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCGameMapInitData($author$project$SceneProtos$CoreEngine$GameComponents$GameMap$Base$GameMapInit))),
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								2,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCWeaponInitData(
									A4(
										$author$project$SceneProtos$CoreEngine$GameComponents$Weapon$Base$WeaponInit,
										_Utils_Tuple2(400, 100),
										_Utils_Tuple2(70 * 1.6, 24 * 1.6),
										15,
										1))))
						]);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: nmap}),
						_List_Nil,
						env);
				case 30:
					var nmap = _List_fromArray(
						[
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								0,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuInitData($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$StarterMenuInit)))
						]);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: nmap}),
						_List_Nil,
						_Utils_update(
							env,
							{
								bb: function (c) {
									return _Utils_update(
										c,
										{dF: true});
								}(env.bb)
							}));
				case 20:
					var objs = _List_fromArray(
						[
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								0,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuInitData($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$StarterMenuInit)))
						]);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: objs}),
						_List_Nil,
						env);
				case 22:
					var objs = _List_fromArray(
						[
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$Rules$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								7,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCRulesInitData($author$project$SceneProtos$CoreEngine$GameComponents$Rules$Base$RulesInit)))
						]);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: objs}),
						_List_Nil,
						env);
				case 23:
					var objs = _List_fromArray(
						[
							A2(
							$author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Export$initGC,
							$author$project$Lib$Env$Env$noCommonData(env),
							A2(
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCIdData,
								0,
								$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCStarterMenuInitData($author$project$SceneProtos$CoreEngine$GameComponents$StarterMenu$Base$StarterMenuInit)))
						]);
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{bS: objs}),
						_List_Nil,
						env);
				case 31:
					var _v11 = msg.a;
					var key = _v11.a;
					var bool = _v11.b;
					var og = env.S;
					var ng = _Utils_update(
						og,
						{
							dd: A3($elm$core$Array$set, key, bool, og.dd)
						});
					return _Utils_Tuple3(
						model,
						_List_Nil,
						_Utils_update(
							env,
							{S: ng}));
				default:
					return _Utils_Tuple3(model, _List_Nil, env);
			}
		}
	});
var $author$project$SceneProtos$CoreEngine$Camera$Camera$checkElite = function (gc) {
	var _v0 = gc.cV.c5;
	if (_v0.$ === 2) {
		var emodel = _v0.a;
		return _Utils_eq(
			emodel.d_,
			$author$project$SceneProtos$CoreEngine$GameComponents$Enemy$Base$EnemyShot(3));
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$removeDead = $elm$core$List$filter(
	function (x) {
		var _v0 = x.cV.dg;
		if (!_v0.$) {
			return true;
		} else {
			var t = _v0.a;
			var _v1 = x.dr;
			switch (_v1) {
				case 'Enemy':
					return $author$project$SceneProtos$CoreEngine$Camera$Camera$checkElite(x) ? (t <= 90) : (t <= 30);
				case 'Bullet':
					return t <= 15;
				case 'Player':
					return t <= 300;
				default:
					return t <= 30;
			}
		}
	});
var $author$project$SceneProtos$CoreEngine$Camera$Camera$removeOutOfBound = F2(
	function (env, ls) {
		return (env.bb.dF ? $elm$core$List$filter(
			function (p) {
				return (p.dr !== 'Enemy') || function () {
					var _v1 = p.cV.bZ;
					var x = _v1.a;
					var y = _v1.b;
					var _v2 = _Utils_Tuple2((x / $author$project$MainConfig$tileSize) | 0, (y / $author$project$MainConfig$tileSize) | 0);
					var tx = _v2.a;
					var ty = _v2.b;
					return !A2(
						$elm$core$Basics$modBy,
						2,
						A2(
							$elm$core$Maybe$withDefault,
							1,
							A3($tortus$elm_array_2d$Array2D$get, tx, ty, env.bb.dT)));
				}();
			}) : function (x) {
			return x;
		})(
			A2(
				$elm$core$List$filter,
				function (p) {
					return (p.dr !== 'Bullet') || function () {
						var _v0 = A2($author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam, env, p.cV.bZ);
						var x = _v0.a;
						var y = _v0.b;
						return (_Utils_cmp(x, -1920) > 0) && ((_Utils_cmp(x, 1920 * 2) < 0) && ((_Utils_cmp(y, -1080) > 0) && (_Utils_cmp(y, 1080 * 2) < 0)));
					}();
				},
				ls));
	});
var $author$project$SceneProtos$CoreEngine$LayerBase$NullBuff = {$: 0};
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$updateBuff = function (env) {
	var oc = env.bb;
	var nb = A2(
		$elm$core$List$map,
		function (b) {
			switch (b.$) {
				case 1:
					var t = b.a;
					return (t > 0) ? $author$project$SceneProtos$CoreEngine$LayerBase$SpeedUp(t - 1) : $author$project$SceneProtos$CoreEngine$LayerBase$NullBuff;
				case 2:
					var t = b.a;
					return (t > 0) ? $author$project$SceneProtos$CoreEngine$LayerBase$IncreaseDamage(t - 1) : $author$project$SceneProtos$CoreEngine$LayerBase$NullBuff;
				default:
					return $author$project$SceneProtos$CoreEngine$LayerBase$NullBuff;
			}
		},
		oc.cN);
	var nc = _Utils_update(
		oc,
		{cN: nb});
	return _Utils_update(
		env,
		{bb: nc});
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$dist = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v1.a;
		var d = _v1.b;
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, a - c, 2) + A2($elm$core$Basics$pow, b - d, 2));
	});
var $elm_community$list_extra$List$Extra$findMap = F2(
	function (f, list) {
		findMap:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var a = list.a;
				var tail = list.b;
				var _v1 = f(a);
				if (!_v1.$) {
					var b = _v1.a;
					return $elm$core$Maybe$Just(b);
				} else {
					var $temp$f = f,
						$temp$list = tail;
					f = $temp$f;
					list = $temp$list;
					continue findMap;
				}
			}
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCByName = function (_v0) {
	var ls = _v0.a;
	var str = _v0.b;
	return A2(
		$elm_community$list_extra$List$Extra$findMap,
		function (gc) {
			return _Utils_eq(gc.dr, str) ? $elm$core$Maybe$Just(gc) : $elm$core$Maybe$Nothing;
		},
		ls);
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCPos = function (gc) {
	if (!gc.$) {
		var g = gc.a;
		return g.cV.bZ;
	} else {
		return _Utils_Tuple2(0, 0);
	}
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamPos = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var c = env.bb;
	var ocam = c.b;
	var _v1 = ocam.bZ;
	var cx = _v1.a;
	var cy = _v1.b;
	var _v2 = ocam.cz;
	var cvx = _v2.a;
	var cvy = _v2.b;
	var newPos = _Utils_Tuple2(
		cx + $elm$core$Basics$floor(cvx),
		cy + $elm$core$Basics$floor(cvy));
	var ncam = _Utils_update(
		ocam,
		{bZ: newPos});
	return _Utils_Tuple2(
		_Utils_update(
			env,
			{
				bb: _Utils_update(
					c,
					{b: ncam})
			}),
		model);
};
var $author$project$MainConfig$cameraFollow = 1;
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCById = function (_v0) {
	var ls = _v0.a;
	var id = _v0.b;
	return A2(
		$elm_community$list_extra$List$Extra$findMap,
		function (gc) {
			return _Utils_eq(gc.cV.cx, id) ? $elm$core$Maybe$Just(gc) : $elm$core$Maybe$Nothing;
		},
		ls);
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamVel = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var c = env.bb;
	var ocam = c.b;
	var _v1 = $author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCPos(
		$author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCById(
			_Utils_Tuple2(model.bS, 0)));
	var px = _v1.a;
	var py = _v1.b;
	var _v2 = ocam.bZ;
	var cx = _v2.a;
	var cy = _v2.b;
	var _v3 = ocam.cz;
	var cvx = _v3.a;
	var cvy = _v3.b;
	var _v4 = ((!_Utils_eq(cx, px)) && (!_Utils_eq(cy, py))) ? _Utils_Tuple2(((px - cx) * 0.08) * $author$project$MainConfig$cameraFollow, ((py - cy) * 0.08) * $author$project$MainConfig$cameraFollow) : _Utils_Tuple2(cvx, cvy);
	var ncvx = _v4.a;
	var ncvy = _v4.b;
	var ncam = _Utils_update(
		ocam,
		{
			cz: _Utils_Tuple2(ncvx, ncvy)
		});
	return _Utils_Tuple2(
		_Utils_update(
			env,
			{
				bb: _Utils_update(
					c,
					{b: ncam})
			}),
		model);
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCameraSize = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var maxs = 1.8;
	var kl = env.S.dd;
	var c = env.bb;
	var ocam = c.b;
	var ncam = A2(
		$elm$core$Maybe$withDefault,
		false,
		A2($elm$core$Array$get, $author$project$Lib$Tools$KeyCode$shift, kl)) ? (((_Utils_cmp(ocam.ag.a, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraWidth * maxs) < 0) && (_Utils_cmp(ocam.ag.b, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraHeight * maxs) < 0)) ? _Utils_update(
		ocam,
		{
			ag: _Utils_Tuple2(ocam.ag.a + 32, ocam.ag.b + 18)
		}) : _Utils_update(
		ocam,
		{
			ag: _Utils_Tuple2($author$project$SceneProtos$CoreEngine$Camera$Config$cameraWidth * maxs, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraHeight * maxs)
		})) : (((_Utils_cmp(ocam.ag.a, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraWidth + 32) < 0) && (_Utils_cmp(ocam.ag.b, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraHeight + 18) < 0)) ? _Utils_update(
		ocam,
		{
			ag: _Utils_Tuple2($author$project$SceneProtos$CoreEngine$Camera$Config$cameraWidth, $author$project$SceneProtos$CoreEngine$Camera$Config$cameraHeight)
		}) : _Utils_update(
		ocam,
		{
			ag: _Utils_Tuple2(ocam.ag.a - 32, ocam.ag.b - 18)
		}));
	return _Utils_Tuple2(
		_Utils_update(
			env,
			{
				bb: _Utils_update(
					c,
					{b: ncam})
			}),
		model);
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCameraState = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var c = env.bb;
	var ocam = c.b;
	var ncam = function () {
		var _v1 = ocam.a2;
		if (_v1.$ === 1) {
			var i = _v1.a;
			return (!i) ? _Utils_update(
				ocam,
				{a2: $author$project$SceneProtos$CoreEngine$Camera$Base$Normal}) : _Utils_update(
				ocam,
				{
					a2: $author$project$SceneProtos$CoreEngine$Camera$Base$Shaking(i - 1)
				});
		} else {
			return ocam;
		}
	}();
	return _Utils_Tuple2(
		_Utils_update(
			env,
			{
				bb: _Utils_update(
					c,
					{b: ncam})
			}),
		model);
};
var $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamera = function (_v0) {
	var env = _v0.a;
	var model = _v0.b;
	var playerPos = $author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCPos(
		$author$project$SceneProtos$CoreEngine$GameComponent$Handler$getGCByName(
			_Utils_Tuple2(model.bS, 'Player')));
	var c = env.bb;
	var ocam = c.b;
	return (A2($author$project$SceneProtos$CoreEngine$Camera$Camera$dist, ocam.bZ, playerPos) <= 3) ? $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCameraState(
		$author$project$SceneProtos$CoreEngine$Camera$Camera$updateCameraSize(
			_Utils_Tuple2(
				_Utils_update(
					env,
					{
						bb: _Utils_update(
							c,
							{b: ocam})
					}),
				model))) : $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCameraState(
		$author$project$SceneProtos$CoreEngine$Camera$Camera$updateCameraSize(
			$author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamPos(
				$author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamVel(
					_Utils_Tuple2(env, model)))));
};
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$updateCoin = F2(
	function (env, objs) {
		var _v0 = A2(
			$elm$core$List$partition,
			function (obj) {
				return (obj.dr === 'Chip') && function () {
					var _v1 = obj.cV.c5;
					if (_v1.$ === 4) {
						var chip = _v1.a;
						var _v2 = chip.aK;
						if (_v2.$ === 1) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				}();
			},
			objs);
		var coins = _v0.a;
		var others = _v0.b;
		var _v3 = A2(
			$elm$core$List$partition,
			function (obj) {
				return obj.dr === 'Player';
			},
			objs);
		var player = _v3.a;
		var obj1 = _v3.b;
		var playerPos = function () {
			var _v9 = $elm$core$List$head(player);
			if (!_v9.$) {
				var p = _v9.a;
				return p.cV.bZ;
			} else {
				return _Utils_Tuple2(0, 0);
			}
		}();
		var _v4 = A2(
			$elm$core$List$partition,
			function (coin) {
				return A3($author$project$SceneProtos$CoreEngine$GameLayer$Model$isInCircle, playerPos, $author$project$MainConfig$tileSize, coin.cV.bZ);
			},
			coins);
		var hitCoins = _v4.a;
		var noHitCoins = _v4.b;
		var nHitCoins = A2(
			$elm$core$List$map,
			function (coin) {
				var d = coin.cV;
				var ndata = _Utils_update(
					d,
					{
						dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(100)
					});
				return _Utils_update(
					coin,
					{cV: ndata});
			},
			hitCoins);
		var nenv = A3(
			$elm$core$List$foldl,
			F2(
				function (coin, oenv) {
					var _v7 = coin.cV.c5;
					if (_v7.$ === 4) {
						var chip = _v7.a;
						var _v8 = chip.aK;
						if (_v8.$ === 1) {
							var c = _v8.a;
							var oc = env.bb;
							var nc = _Utils_update(
								oc,
								{cR: oc.cR + c});
							return _Utils_update(
								oenv,
								{bb: nc});
						} else {
							return oenv;
						}
					} else {
						return oenv;
					}
				}),
			env,
			nHitCoins);
		var _v5 = A2(
			$elm$core$List$partition,
			function (coin) {
				return A3($author$project$SceneProtos$CoreEngine$GameLayer$Model$isInCircle, playerPos, $author$project$MainConfig$tileSize * 3, coin.cV.bZ);
			},
			noHitCoins);
		var nearCoins = _v5.a;
		var farCoins = _v5.b;
		var nFarCoins = A2(
			$elm$core$List$map,
			function (coin) {
				var d = coin.cV;
				var ndata = _Utils_update(
					d,
					{dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive});
				return _Utils_update(
					coin,
					{cV: ndata});
			},
			farCoins);
		var nNearCoins = A2(
			$elm$core$List$map,
			function (coin) {
				var d = coin.cV;
				var omodel = function () {
					var _v6 = d.c5;
					if (_v6.$ === 4) {
						var chip = _v6.a;
						return chip;
					} else {
						return $author$project$SceneProtos$CoreEngine$GameComponents$Chip$Base$nullModel;
					}
				}();
				var ndata = _Utils_update(
					d,
					{
						c5: $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCChipModel(
							_Utils_update(
								omodel,
								{
									dR: A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, playerPos)
								})),
						dg: $author$project$SceneProtos$CoreEngine$GameComponent$Base$Dead(0)
					});
				return _Utils_update(
					coin,
					{cV: ndata});
			},
			nearCoins);
		var nobj = _Utils_ap(
			others,
			_Utils_ap(
				nHitCoins,
				_Utils_ap(nNearCoins, nFarCoins)));
		return _Utils_Tuple3(nobj, _List_Nil, nenv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCCollisionBulletMsg = function (a) {
	return {$: 5, a: a};
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByBulletMsg = function (a) {
	return {$: 8, a: a};
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$cross = F3(
	function (_v0, _v1, _v2) {
		var x1 = _v0.a;
		var y1 = _v0.b;
		var x2 = _v1.a;
		var y2 = _v1.b;
		var x3 = _v2.a;
		var y3 = _v2.b;
		return ((x1 - x3) * (y2 - y3)) - ((x2 - x3) * (y1 - y3));
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg = F4(
	function (_v0, _v1, _v2, _v3) {
		var x1 = _v0.a;
		var y1 = _v0.b;
		var x2 = _v1.a;
		var y2 = _v1.b;
		var x3 = _v2.a;
		var y3 = _v2.b;
		var x4 = _v3.a;
		var y4 = _v3.b;
		return ((_Utils_cmp(
			A2($elm$core$Basics$max, x3, x4),
			A2($elm$core$Basics$min, x1, x2)) < 0) || ((_Utils_cmp(
			A2($elm$core$Basics$max, x1, x2),
			A2($elm$core$Basics$min, x3, x4)) < 0) || ((_Utils_cmp(
			A2($elm$core$Basics$max, y3, y4),
			A2($elm$core$Basics$min, y1, y2)) < 0) || (_Utils_cmp(
			A2($elm$core$Basics$max, y1, y2),
			A2($elm$core$Basics$min, y3, y4)) < 0)))) ? false : ((((A3(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$cross,
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x3, y3),
			_Utils_Tuple2(x4, y4)) * A3(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$cross,
			_Utils_Tuple2(x2, y2),
			_Utils_Tuple2(x3, y3),
			_Utils_Tuple2(x4, y4))) > 0) || ((A3(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$cross,
			_Utils_Tuple2(x4, y4),
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x2, y2)) * A3(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$cross,
			_Utils_Tuple2(x3, y3),
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x2, y2))) > 0)) ? false : true);
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	var _v1 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, d.bZ);
	var x = _v1.a;
	var y = _v1.b;
	var _v2 = d.cz;
	var vx = _v2.a;
	var vy = _v2.b;
	var angle = A2($elm$core$Basics$atan2, vy, vx);
	var lineList = A2(
		$elm$core$List$concatMap,
		function (hb) {
			var _v3 = _Utils_Tuple2(x + vx, y + vy);
			var x6 = _v3.a;
			var y6 = _v3.b;
			var _v4 = _Utils_Tuple2(x, y);
			var x5 = _v4.a;
			var y5 = _v4.b;
			var _v5 = _Utils_Tuple2(hb.bT, hb.ag);
			var _v6 = _v5.a;
			var x_ = _v6.a;
			var y_ = _v6.b;
			var _v7 = _v5.b;
			var w_ = _v7.a;
			var h_ = _v7.b;
			var _v8 = _Utils_Tuple2(
				_Utils_Tuple2(x_ - (w_ / 2), y_ - (h_ / 2)),
				_Utils_Tuple2(x_ + (w_ / 2), y_ + (h_ / 2)));
			var _v9 = _v8.a;
			var leftX = _v9.a;
			var leftY = _v9.b;
			var _v10 = _v8.b;
			var rightX = _v10.a;
			var rightY = _v10.b;
			var _v11 = _Utils_Tuple2(
				(x + (leftX * $elm$core$Basics$cos(angle))) - (leftY * $elm$core$Basics$sin(angle)),
				(y + (leftX * $elm$core$Basics$sin(angle))) + (leftY * $elm$core$Basics$cos(angle)));
			var x1 = _v11.a;
			var y1 = _v11.b;
			var _v12 = _Utils_Tuple2(
				((x + vx) + (leftX * $elm$core$Basics$cos(angle))) - (leftY * $elm$core$Basics$sin(angle)),
				((y + vy) + (leftX * $elm$core$Basics$sin(angle))) + (leftY * $elm$core$Basics$cos(angle)));
			var x4 = _v12.a;
			var y4 = _v12.b;
			var _v13 = _Utils_Tuple2(
				((x + vx) + (rightX * $elm$core$Basics$cos(angle))) - (rightY * $elm$core$Basics$sin(angle)),
				((y + vy) + (rightX * $elm$core$Basics$sin(angle))) + (rightY * $elm$core$Basics$cos(angle)));
			var x2 = _v13.a;
			var y2 = _v13.b;
			var _v14 = _Utils_Tuple2(
				(x + (rightX * $elm$core$Basics$cos(angle))) - (rightY * $elm$core$Basics$sin(angle)),
				(y + (rightX * $elm$core$Basics$sin(angle))) + (rightY * $elm$core$Basics$cos(angle)));
			var x3 = _v14.a;
			var y3 = _v14.b;
			return _List_fromArray(
				[
					{
					R: _Utils_Tuple2(x2, y2),
					X: _Utils_Tuple2(x1, y1)
				},
					{
					R: _Utils_Tuple2(x4, y4),
					X: _Utils_Tuple2(x3, y3)
				},
					{
					R: _Utils_Tuple2(x6, y6),
					X: _Utils_Tuple2(x5, y5)
				}
				]);
		},
		A2($elm$core$List$cons, d.cl, d.bm));
	return lineList;
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletEnemy = function (_v0) {
	var env = _v0.a;
	var bulletd = _v0.b;
	var enemyd = _v0.c;
	var bmodel = function () {
		var _v2 = bulletd.c5;
		if (_v2.$ === 5) {
			var model = _v2.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet;
		}
	}();
	var _v1 = bmodel.a$;
	if (!_v1.$) {
		var enemyLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
			_Utils_Tuple2(env, enemyd));
		var bulletLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
			_Utils_Tuple2(env, bulletd));
		return A2(
			$elm$core$List$member,
			true,
			A2(
				$elm$core$List$map,
				function (bulletLine) {
					return A2(
						$elm$core$List$member,
						true,
						A2(
							$elm$core$List$map,
							function (enemyLine) {
								return A4($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg, bulletLine.X, bulletLine.R, enemyLine.X, enemyLine.R);
							},
							enemyLineList));
				},
				bulletLineList));
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsEnemies = F3(
	function (env, bullets, enemies) {
		return A2(
			$elm$core$List$concatMap,
			function (bullet) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (enemy, _v0) {
							var cls = _v0.a;
							var isFirst = _v0.b;
							return (isFirst && $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletEnemy(
								_Utils_Tuple3(env, bullet.cV, enemy.cV))) ? _Utils_Tuple2(
								_Utils_ap(
									_List_fromArray(
										[
											_Utils_Tuple2(
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(bullet.cV.cx),
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCCollisionBulletMsg('Enemy')),
											_Utils_Tuple2(
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(enemy.cV.cx),
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByBulletMsg(bullet.cV.c5))
										]),
									cls),
								false) : _Utils_Tuple2(cls, isFirst);
						}),
					_Utils_Tuple2(_List_Nil, true),
					enemies).a;
			},
			bullets);
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegTile = F2(
	function (line, _v0) {
		var gx = _v0.a;
		var gy = _v0.b;
		var _v1 = _Utils_Tuple2(gx * $author$project$MainConfig$tileSize, (gy * $author$project$MainConfig$tileSize) + $author$project$MainConfig$tileSize);
		var x6 = _v1.a;
		var y6 = _v1.b;
		var _v2 = _Utils_Tuple2((gx * $author$project$MainConfig$tileSize) + $author$project$MainConfig$tileSize, (gy * $author$project$MainConfig$tileSize) + $author$project$MainConfig$tileSize);
		var x5 = _v2.a;
		var y5 = _v2.b;
		var _v3 = _Utils_Tuple2((gx * $author$project$MainConfig$tileSize) + $author$project$MainConfig$tileSize, gy * $author$project$MainConfig$tileSize);
		var x4 = _v3.a;
		var y4 = _v3.b;
		var _v4 = _Utils_Tuple2(gx * $author$project$MainConfig$tileSize, gy * $author$project$MainConfig$tileSize);
		var x3 = _v4.a;
		var y3 = _v4.b;
		var _v5 = line.X;
		var stx = _v5.a;
		var sty = _v5.b;
		var _v6 = _Utils_Tuple2(stx, sty);
		var x1 = _v6.a;
		var y1 = _v6.b;
		var _v7 = line.R;
		var enx = _v7.a;
		var eny = _v7.b;
		var _v8 = _Utils_Tuple2(enx, eny);
		var x2 = _v8.a;
		var y2 = _v8.b;
		return A4(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg,
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x2, y2),
			_Utils_Tuple2(x3, y3),
			_Utils_Tuple2(x4, y4)) ? true : (A4(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg,
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x2, y2),
			_Utils_Tuple2(x4, y4),
			_Utils_Tuple2(x5, y5)) ? true : (A4(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg,
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x2, y2),
			_Utils_Tuple2(x5, y5),
			_Utils_Tuple2(x6, y6)) ? true : (A4(
			$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg,
			_Utils_Tuple2(x1, y1),
			_Utils_Tuple2(x2, y2),
			_Utils_Tuple2(x6, y6),
			_Utils_Tuple2(x3, y3)) ? true : false)));
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genTLine = F2(
	function (_v0, line) {
		var env = _v0.a;
		var d = _v0.b;
		var tm = env.bb.dT;
		var sty = A2($elm$core$Basics$min, line.X.b, line.R.b);
		var ysIndex = ($elm$core$Basics$floor(sty) / $author$project$MainConfig$tileSize) | 0;
		var stx = A2($elm$core$Basics$min, line.X.a, line.R.a);
		var xsIndex = ($elm$core$Basics$floor(stx) / $author$project$MainConfig$tileSize) | 0;
		var eny = A2($elm$core$Basics$max, line.X.b, line.R.b);
		var yeIndex = ($elm$core$Basics$floor(eny) / $author$project$MainConfig$tileSize) | 0;
		var enx = A2($elm$core$Basics$max, line.X.a, line.R.a);
		var xeIndex = ($elm$core$Basics$floor(enx) / $author$project$MainConfig$tileSize) | 0;
		var tline = $author$project$Lib$Tools$ArrayTools$array2D_flatten(
			A3(
				$author$project$Lib$Tools$ArrayTools$array2D_indexedSlice,
				_Utils_Tuple2(xsIndex, ysIndex),
				_Utils_Tuple2(xeIndex, yeIndex),
				tm));
		return tline;
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletGamemap = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	var lineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
		_Utils_Tuple2(env, d));
	return A2(
		$elm$core$List$member,
		true,
		A2(
			$elm$core$List$map,
			function (line) {
				var tline = A2(
					$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genTLine,
					_Utils_Tuple2(env, d),
					line);
				return A2(
					$elm$core$List$member,
					true,
					A2(
						$elm$core$List$map,
						function (_v1) {
							var _v2 = _v1.a;
							var gx = _v2.a;
							var gy = _v2.b;
							var grid = _v1.b;
							return (A2($elm$core$Basics$modBy, 2, grid) === 1) ? A2(
								$author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegTile,
								line,
								_Utils_Tuple2(gx, gy)) : false;
						},
						tline)) ? true : false;
			},
			lineList));
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsGamemap = F2(
	function (env, bullets) {
		return A2(
			$elm$core$List$concatMap,
			function (bullet) {
				return $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletGamemap(
					_Utils_Tuple2(env, bullet.cV)) ? _List_fromArray(
					[
						_Utils_Tuple2(
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(bullet.cV.cx),
						$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCCollisionBulletMsg('GameMap'))
					]) : _List_Nil;
			},
			bullets);
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletPlayer = function (_v0) {
	var env = _v0.a;
	var bulletd = _v0.b;
	var playerd = _v0.c;
	var bmodel = function () {
		var _v2 = bulletd.c5;
		if (_v2.$ === 5) {
			var model = _v2.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet;
		}
	}();
	var _v1 = bmodel.a$;
	if (_v1.$ === 1) {
		var enemyLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
			_Utils_Tuple2(env, playerd));
		var bulletLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
			_Utils_Tuple2(env, bulletd));
		return A2(
			$elm$core$List$member,
			true,
			A2(
				$elm$core$List$map,
				function (bulletLine) {
					return A2(
						$elm$core$List$member,
						true,
						A2(
							$elm$core$List$map,
							function (enemyLine) {
								return A4($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg, bulletLine.X, bulletLine.R, enemyLine.X, enemyLine.R);
							},
							enemyLineList));
				},
				bulletLineList));
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsPlayer = F3(
	function (env, bullets, players) {
		return A2(
			$elm$core$List$concatMap,
			function (bullet) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (player, _v0) {
							var cls = _v0.a;
							var isFirst = _v0.b;
							return (isFirst && $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletPlayer(
								_Utils_Tuple3(env, bullet.cV, player.cV))) ? _Utils_Tuple2(
								_Utils_ap(
									_List_fromArray(
										[
											_Utils_Tuple2(
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(bullet.cV.cx),
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCCollisionBulletMsg('Player')),
											_Utils_Tuple2(
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(player.cV.cx),
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByBulletMsg(bullet.cV.c5))
										]),
									cls),
								false) : _Utils_Tuple2(cls, isFirst);
						}),
					_Utils_Tuple2(_List_Nil, true),
					players).a;
			},
			bullets);
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineListWeapon = function (_v0) {
	var env = _v0.a;
	var d = _v0.b;
	var angle = function () {
		var _v12 = d.c5;
		if (_v12.$ === 3) {
			var model = _v12.a;
			return model.cI;
		} else {
			return 0;
		}
	}();
	var _v1 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, d.bZ);
	var x = _v1.a;
	var y = _v1.b;
	var lineList = A2(
		$elm$core$List$concatMap,
		function (hb) {
			var _v2 = _Utils_Tuple2(hb.bT, hb.ag);
			var _v3 = _v2.a;
			var x_ = _v3.a;
			var y_ = _v3.b;
			var _v4 = _v2.b;
			var w_ = _v4.a;
			var h_ = _v4.b;
			var _v5 = _Utils_Tuple2(
				_Utils_Tuple2(x_ - w_, y_ - (h_ / 2)),
				_Utils_Tuple2(x_, y_ + (h_ / 2)));
			var _v6 = _v5.a;
			var leftX = _v6.a;
			var leftY = _v6.b;
			var _v7 = _v5.b;
			var rightX = _v7.a;
			var rightY = _v7.b;
			var _v8 = _Utils_Tuple2(
				(x + (leftX * $elm$core$Basics$cos(angle))) - (leftY * $elm$core$Basics$sin(angle)),
				(y + (leftX * $elm$core$Basics$sin(angle))) + (leftY * $elm$core$Basics$cos(angle)));
			var x1 = _v8.a;
			var y1 = _v8.b;
			var _v9 = _Utils_Tuple2(
				(x + (rightX * $elm$core$Basics$cos(angle))) - (leftY * $elm$core$Basics$sin(angle)),
				(y + (rightX * $elm$core$Basics$sin(angle))) + (leftY * $elm$core$Basics$cos(angle)));
			var x2 = _v9.a;
			var y2 = _v9.b;
			var _v10 = _Utils_Tuple2(
				(x + (rightX * $elm$core$Basics$cos(angle))) - (rightY * $elm$core$Basics$sin(angle)),
				(y + (rightX * $elm$core$Basics$sin(angle))) + (rightY * $elm$core$Basics$cos(angle)));
			var x3 = _v10.a;
			var y3 = _v10.b;
			var _v11 = _Utils_Tuple2(
				(x + (leftX * $elm$core$Basics$cos(angle))) - (rightY * $elm$core$Basics$sin(angle)),
				(y + (leftX * $elm$core$Basics$sin(angle))) + (rightY * $elm$core$Basics$cos(angle)));
			var x4 = _v11.a;
			var y4 = _v11.b;
			return _List_fromArray(
				[
					{
					R: _Utils_Tuple2(x3, y3),
					X: _Utils_Tuple2(x1, y1)
				},
					{
					R: _Utils_Tuple2(x2, y2),
					X: _Utils_Tuple2(x4, y4)
				}
				]);
		},
		A2($elm$core$List$cons, d.cl, d.bm));
	return lineList;
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletWeapon = function (_v0) {
	var env = _v0.a;
	var bulletd = _v0.b;
	var weapond = _v0.c;
	var bmodel = function () {
		var _v2 = bulletd.c5;
		if (_v2.$ === 5) {
			var model = _v2.a;
			return model;
		} else {
			return $author$project$SceneProtos$CoreEngine$GameComponents$Bullet$Base$nullBullet;
		}
	}();
	var _v1 = bmodel.a$;
	if (_v1.$ === 1) {
		var enemyLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineListWeapon(
			_Utils_Tuple2(env, weapond));
		var bulletLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
			_Utils_Tuple2(env, bulletd));
		return A2(
			$elm$core$List$member,
			true,
			A2(
				$elm$core$List$map,
				function (bulletLine) {
					return A2(
						$elm$core$List$member,
						true,
						A2(
							$elm$core$List$map,
							function (enemyLine) {
								return A4($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg, bulletLine.X, bulletLine.R, enemyLine.X, enemyLine.R);
							},
							enemyLineList));
				},
				bulletLineList));
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsWeapon = F3(
	function (env, bullets, weapons) {
		return A2(
			$elm$core$List$concatMap,
			function (bullet) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (weapon, cls) {
							return $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionBulletWeapon(
								_Utils_Tuple3(env, bullet.cV, weapon.cV)) ? _Utils_ap(
								_List_fromArray(
									[
										_Utils_Tuple2(
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(bullet.cV.cx),
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCCollisionBulletMsg('Weapon'))
									]),
								cls) : cls;
						}),
					_List_Nil,
					weapons);
			},
			bullets);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCAtkPlayerMsg = {$: 15};
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByEnemyMsg = function (a) {
	return {$: 13, a: a};
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionEnemyPlayer = function (_v0) {
	var env = _v0.a;
	var enemyd = _v0.b;
	var playerd = _v0.c;
	var playerLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
		_Utils_Tuple2(env, playerd));
	var enemyLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
		_Utils_Tuple2(env, enemyd));
	return A2(
		$elm$core$List$member,
		true,
		A2(
			$elm$core$List$map,
			function (enemyLine) {
				return A2(
					$elm$core$List$member,
					true,
					A2(
						$elm$core$List$map,
						function (playerLine) {
							return A4($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg, enemyLine.X, enemyLine.R, playerLine.X, playerLine.R);
						},
						playerLineList));
			},
			enemyLineList));
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoEnemiesPlayer = F3(
	function (env, enemies, players) {
		return A2(
			$elm$core$List$concatMap,
			function (enemy) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (player, _v0) {
							var cls = _v0.a;
							var isFirst = _v0.b;
							return (isFirst && $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionEnemyPlayer(
								_Utils_Tuple3(env, enemy.cV, player.cV))) ? _Utils_Tuple2(
								_Utils_ap(
									_List_fromArray(
										[
											_Utils_Tuple2(
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(enemy.cV.cx),
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCAtkPlayerMsg),
											_Utils_Tuple2(
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(player.cV.cx),
											$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByEnemyMsg(enemy.cV.c5))
										]),
									cls),
								false) : _Utils_Tuple2(cls, isFirst);
						}),
					_Utils_Tuple2(_List_Nil, true),
					players).a;
			},
			A2(
				$elm$core$List$filter,
				function (gc) {
					var _v1 = gc.cV.c5;
					if (_v1.$ === 2) {
						var model = _v1.a;
						var _v2 = model.d_;
						if (_v2.$ === 1) {
							return (env.Y - model.bB) > 60;
						} else {
							return false;
						}
					} else {
						return false;
					}
				},
				enemies));
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByWeaponMsg = function (a) {
	return {$: 14, a: a};
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionEnemyWeapon = function (_v0) {
	var env = _v0.a;
	var enemyd = _v0.b;
	var weapond = _v0.c;
	var weaponLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineListWeapon(
		_Utils_Tuple2(env, weapond));
	var enemyLineList = $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$genLineList(
		_Utils_Tuple2(env, enemyd));
	return A2(
		$elm$core$List$member,
		true,
		A2(
			$elm$core$List$map,
			function (enemyLine) {
				return A2(
					$elm$core$List$member,
					true,
					A2(
						$elm$core$List$map,
						function (weaponLine) {
							return A4($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkIntersectSegSeg, enemyLine.X, enemyLine.R, weaponLine.X, weaponLine.R);
						},
						weaponLineList));
			},
			enemyLineList));
};
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoEnemiesWeapon = F3(
	function (env, enemies, weapons) {
		return A2(
			$elm$core$List$concatMap,
			function (enemy) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (weapon, cls) {
							return $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$chkCollisionEnemyWeapon(
								_Utils_Tuple3(env, enemy.cV, weapon.cV)) ? _Utils_ap(
								_List_fromArray(
									[
										_Utils_Tuple2(
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCById(enemy.cV.cx),
										$author$project$SceneProtos$CoreEngine$GameComponent$Base$GCHitByWeaponMsg(weapon.cV.c5))
									]),
								cls) : cls;
						}),
					_List_Nil,
					weapons);
			},
			enemies);
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCollision = F2(
	function (env, objs) {
		var _v0 = A2(
			$elm$core$List$partition,
			function (obj) {
				return obj.dr === 'Bullet';
			},
			objs);
		var bullets = _v0.a;
		var objs2 = _v0.b;
		var rbullets = A2(
			$elm$core$List$filter,
			function (obj) {
				return _Utils_eq(obj.cV.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive);
			},
			bullets);
		var _v1 = A2(
			$elm$core$List$partition,
			function (obj) {
				return obj.dr === 'Enemy';
			},
			objs2);
		var enemies = _v1.a;
		var objs3 = _v1.b;
		var renemies = A2(
			$elm$core$List$filter,
			function (obj) {
				return _Utils_eq(obj.cV.dg, $author$project$SceneProtos$CoreEngine$GameComponent$Base$Alive);
			},
			enemies);
		var _v2 = A2(
			$elm$core$List$partition,
			function (obj) {
				return obj.dr === 'Player';
			},
			objs3);
		var player = _v2.a;
		var objs4 = _v2.b;
		var _v3 = A2(
			$elm$core$List$partition,
			function (obj) {
				return obj.dr === 'Weapon';
			},
			objs4);
		var weapon = _v3.a;
		var objs5 = _v3.b;
		var rweapon = A2(
			$elm$core$List$filter,
			function (obj) {
				var _v4 = obj.cV.c5;
				if (_v4.$ === 3) {
					var model = _v4.a;
					return (!model.aS) && (_Utils_cmp(
						env.Y - model.bz,
						$elm$core$Basics$round(model.aR / 2.5)) < 0);
				} else {
					return false;
				}
			},
			weapon);
		return _Utils_ap(
			A2($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsGamemap, env, rbullets),
			_Utils_ap(
				A3($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsEnemies, env, rbullets, renemies),
				_Utils_ap(
					A3($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsPlayer, env, rbullets, player),
					_Utils_ap(
						A3($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoEnemiesPlayer, env, renemies, player),
						_Utils_ap(
							A3($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoBulletsWeapon, env, rbullets, rweapon),
							A3($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCoEnemiesWeapon, env, renemies, rweapon))))));
	});
var $author$project$Lib$Env$Env$cleanEnvC = function (env) {
	return _Utils_update(
		env,
		{w: $author$project$Base$NullMsg});
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$match = F2(
	function (gc, tar) {
		switch (tar.$) {
			case 0:
				return false;
			case 1:
				var x = tar.a;
				return _Utils_eq(x, gc.cV.cx);
			default:
				var x = tar.a;
				return _Utils_eq(x, gc.dr);
		}
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$super = function (tar) {
	if (!tar.$) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$update = F2(
	function (gc, env) {
		var _v0 = A2(gc.d$, env, gc.cV);
		var newGC = _v0.a;
		var newMsg = _v0.b;
		var newEnv = _v0.c;
		return _Utils_Tuple3(
			_Utils_update(
				gc,
				{cV: newGC}),
			newMsg,
			newEnv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$updaterec = F3(
	function (gc, env, msg) {
		var _v0 = A3(gc.d0, env, msg, gc.cV);
		var newGC = _v0.a;
		var newMsg = _v0.b;
		var newEnv = _v0.c;
		return _Utils_Tuple3(
			_Utils_update(
				gc,
				{cV: newGC}),
			newMsg,
			newEnv);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$recBody = {cP: $author$project$Lib$Env$Env$cleanEnvC, dn: $author$project$SceneProtos$CoreEngine$GameComponent$Handler$match, dQ: $author$project$SceneProtos$CoreEngine$GameComponent$Handler$super, d$: $author$project$SceneProtos$CoreEngine$GameComponent$Handler$update, d0: $author$project$SceneProtos$CoreEngine$GameComponent$Handler$updaterec};
var $linsyking$messenger_core$Messenger$RecursionList$updateRemain = F4(
	function (rec, env, _v0, objs) {
		updateRemain:
		while (true) {
			var unfinishedMsg = _v0.a;
			var finishedMsg = _v0.b;
			if ($elm$core$List$isEmpty(unfinishedMsg)) {
				return _Utils_Tuple3(objs, finishedMsg, env);
			} else {
				var _v1 = A3(
					$elm$core$List$foldr,
					F2(
						function (ele, _v3) {
							var lastObjs = _v3.a;
							var _v4 = _v3.b;
							var lastMsgUnfinished = _v4.a;
							var lastMsgFinished = _v4.b;
							var lastEnv = _v3.c;
							var msgMatched = A2(
								$elm$core$List$filterMap,
								function (_v12) {
									var tar = _v12.a;
									var msg = _v12.b;
									return A2(rec.dn, ele, tar) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing;
								},
								unfinishedMsg);
							if ($elm$core$List$isEmpty(msgMatched)) {
								return _Utils_Tuple3(
									A2($elm$core$List$cons, ele, lastObjs),
									_Utils_Tuple2(lastMsgUnfinished, lastMsgFinished),
									lastEnv);
							} else {
								var _v5 = A3(
									$elm$core$List$foldl,
									F2(
										function (msg, _v7) {
											var lastObj2 = _v7.a;
											var _v8 = _v7.b;
											var lastMsgUnfinished2 = _v8.a;
											var lastMsgFinished2 = _v8.b;
											var lastEnv2 = _v7.c;
											var _v9 = A3(rec.d0, lastObj2, lastEnv2, msg);
											var newEle = _v9.a;
											var newMsgs = _v9.b;
											var newEnv3 = _v9.c;
											var finishedMsgs = A2(
												$elm$core$List$filterMap,
												function (_v11) {
													var x = _v11.a;
													var y = _v11.b;
													return rec.dQ(x) ? $elm$core$Maybe$Just(y) : $elm$core$Maybe$Nothing;
												},
												newMsgs);
											var unfinishedMsgs = A2(
												$elm$core$List$filter,
												function (_v10) {
													var x = _v10.a;
													return !rec.dQ(x);
												},
												newMsgs);
											return _Utils_Tuple3(
												newEle,
												_Utils_Tuple2(
													_Utils_ap(lastMsgUnfinished2, unfinishedMsgs),
													_Utils_ap(lastMsgFinished2, finishedMsgs)),
												newEnv3);
										}),
									_Utils_Tuple3(
										ele,
										_Utils_Tuple2(_List_Nil, _List_Nil),
										env),
									msgMatched);
								var newObj = _v5.a;
								var _v6 = _v5.b;
								var newMsgUnfinished = _v6.a;
								var newMsgFinished = _v6.b;
								var newEnv2 = _v5.c;
								return _Utils_Tuple3(
									A2($elm$core$List$cons, newObj, lastObjs),
									_Utils_Tuple2(
										_Utils_ap(lastMsgUnfinished, newMsgUnfinished),
										_Utils_ap(lastMsgFinished, newMsgFinished)),
									newEnv2);
							}
						}),
					_Utils_Tuple3(
						_List_Nil,
						_Utils_Tuple2(_List_Nil, _List_Nil),
						env),
					objs);
				var newObjs = _v1.a;
				var _v2 = _v1.b;
				var newUnfinishedMsg = _v2.a;
				var newFinishedMsg = _v2.b;
				var newEnv = _v1.c;
				var $temp$rec = rec,
					$temp$env = newEnv,
					$temp$_v0 = _Utils_Tuple2(
					newUnfinishedMsg,
					_Utils_ap(finishedMsg, newFinishedMsg)),
					$temp$objs = newObjs;
				rec = $temp$rec;
				env = $temp$env;
				_v0 = $temp$_v0;
				objs = $temp$objs;
				continue updateRemain;
			}
		}
	});
var $linsyking$messenger_core$Messenger$RecursionList$updateObjectsWithTarget = F4(
	function (rec, env, msgs, objs) {
		return A4(
			$linsyking$messenger_core$Messenger$RecursionList$updateRemain,
			rec,
			env,
			_Utils_Tuple2(msgs, _List_Nil),
			objs);
	});
var $author$project$SceneProtos$CoreEngine$Physics$CollisionGC$updateCollision = F2(
	function (env, objs) {
		return A4(
			$linsyking$messenger_core$Messenger$RecursionList$updateObjectsWithTarget,
			$author$project$SceneProtos$CoreEngine$GameComponent$Handler$recBody,
			env,
			A2($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$judgeCollision, env, objs),
			objs);
	});
var $linsyking$messenger_core$Messenger$RecursionList$updateOnce = F3(
	function (rec, env, objs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (ele, _v0) {
					var lastObjs = _v0.a;
					var _v1 = _v0.b;
					var lastMsgUnfinished = _v1.a;
					var lastMsgFinished = _v1.b;
					var lastEnv = _v0.c;
					var _v2 = A2(rec.d$, ele, lastEnv);
					var newObj = _v2.a;
					var newMsg = _v2.b;
					var newEnv = _v2.c;
					var finishedMsg = A2(
						$elm$core$List$filterMap,
						function (_v4) {
							var x = _v4.a;
							var y = _v4.b;
							return rec.dQ(x) ? $elm$core$Maybe$Just(y) : $elm$core$Maybe$Nothing;
						},
						newMsg);
					var unfinishedMsg = A2(
						$elm$core$List$filter,
						function (_v3) {
							var x = _v3.a;
							return !rec.dQ(x);
						},
						newMsg);
					return _Utils_Tuple3(
						A2($elm$core$List$cons, newObj, lastObjs),
						_Utils_Tuple2(
							_Utils_ap(lastMsgUnfinished, unfinishedMsg),
							_Utils_ap(lastMsgFinished, finishedMsg)),
						newEnv);
				}),
			_Utils_Tuple3(
				_List_Nil,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				env),
			objs);
	});
var $linsyking$messenger_core$Messenger$RecursionList$updateObjects = F3(
	function (rec, env, objs) {
		var _v0 = A3($linsyking$messenger_core$Messenger$RecursionList$updateOnce, rec, env, objs);
		var newObjs = _v0.a;
		var _v1 = _v0.b;
		var newMsgUnfinished = _v1.a;
		var newMsgFinished = _v1.b;
		var newEnv = _v0.c;
		return A4(
			$linsyking$messenger_core$Messenger$RecursionList$updateRemain,
			rec,
			rec.cP(newEnv),
			_Utils_Tuple2(newMsgUnfinished, newMsgFinished),
			newObjs);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$updateGC = F2(
	function (env, xs) {
		var _v0 = A3($linsyking$messenger_core$Messenger$RecursionList$updateObjects, $author$project$SceneProtos$CoreEngine$GameComponent$Handler$recBody, env, xs);
		var newGC = _v0.a;
		var newMsg = _v0.b;
		var newEnv = _v0.c;
		return _Utils_Tuple3(newGC, newMsg, newEnv);
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$updateModel = F2(
	function (env, model) {
		if (env.S.dN === 1) {
			var objs = model.bS;
			var objsWithoutPauseMenu = A2(
				$elm$core$List$filter,
				function (x) {
					return (x.dr !== 'PauseMenu') && (x.dr !== 'UpgradeMenu');
				},
				objs);
			var pauseMenu = A2(
				$elm$core$List$filter,
				function (x) {
					return (x.dr === 'PauseMenu') || (x.dr === 'UpgradeMenu');
				},
				objs);
			var _v0 = A2($author$project$SceneProtos$CoreEngine$GameComponent$Handler$updateGC, env, pauseMenu);
			var newObjs = _v0.a;
			var newMsg = _v0.b;
			var newEnv = _v0.c;
			var nl = A2(
				$elm$core$List$filter,
				function (x) {
					return _Utils_eq(x, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg) || _Utils_eq(x, $author$project$SceneProtos$CoreEngine$GameComponent$Base$QuitMsg);
				},
				newMsg);
			var newestMsg = function () {
				var _v3 = $elm$core$List$length(nl);
				if (_v3 === 1) {
					return A2($elm$core$List$member, $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg, nl) ? $author$project$SceneProtos$CoreEngine$GameComponent$Base$ResumeMsg : $author$project$SceneProtos$CoreEngine$GameComponent$Base$QuitMsg;
				} else {
					return $author$project$SceneProtos$CoreEngine$GameComponent$Base$NullGCMsg;
				}
			}();
			var _v1 = $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamera(
				_Utils_Tuple2(
					newEnv,
					_Utils_update(
						model,
						{
							bS: _Utils_ap(newObjs, objsWithoutPauseMenu)
						})));
			var newestEnv = _v1.a;
			var newestModel = _v1.b;
			var _v2 = A3($author$project$SceneProtos$CoreEngine$GameLayer$Model$handleComponentMsg, newestEnv, newestMsg, newestModel);
			var nm = _v2.a;
			var nmsg = _v2.b;
			var nenv = _v2.c;
			return _Utils_Tuple3(nm, nmsg, nenv);
		} else {
			var objs = A2(
				$author$project$SceneProtos$CoreEngine$Camera$Camera$removeOutOfBound,
				env,
				$author$project$SceneProtos$CoreEngine$Camera$Camera$removeDead(model.bS));
			var _v4 = A2($author$project$SceneProtos$CoreEngine$GameComponent$Handler$updateGC, env, objs);
			var newObjs = _v4.a;
			var newMsg = _v4.b;
			var newEnv = _v4.c;
			var _v5 = A2($author$project$SceneProtos$CoreEngine$Physics$CollisionGC$updateCollision, newEnv, newObjs);
			var newObjs2 = _v5.a;
			var newMsg2 = _v5.b;
			var newEnv2 = _v5.c;
			var _v6 = A2($author$project$SceneProtos$CoreEngine$GameLayer$Model$updateCoin, newEnv2, newObjs2);
			var newObjs3 = _v6.a;
			var newMsg3 = _v6.b;
			var newEnv3 = _v6.c;
			var _v7 = $author$project$SceneProtos$CoreEngine$Camera$Camera$updateCamera(
				_Utils_Tuple2(
					$author$project$SceneProtos$CoreEngine$GameLayer$Model$updateBuff(newEnv3),
					_Utils_update(
						model,
						{bS: newObjs3})));
			var newestEnv = _v7.a;
			var newestModel = _v7.b;
			return A3(
				$elm$core$List$foldl,
				F2(
					function (cTMsg, _v8) {
						var m = _v8.a;
						var cmsg = _v8.b;
						var cenv = _v8.c;
						var _v9 = A3($author$project$SceneProtos$CoreEngine$GameLayer$Model$handleComponentMsg, cenv, cTMsg, m);
						var nm = _v9.a;
						var nmsg = _v9.b;
						var nenv = _v9.c;
						return _Utils_Tuple3(
							nm,
							_Utils_ap(nmsg, cmsg),
							nenv);
					}),
				_Utils_Tuple3(newestModel, _List_Nil, newestEnv),
				_Utils_ap(
					newMsg,
					_Utils_ap(newMsg2, newMsg3)));
		}
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$updateModelRec = F3(
	function (env, _v0, model) {
		return _Utils_Tuple3(model, _List_Nil, env);
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$debug = F2(
	function (env, model) {
		var text = function () {
			var _v0 = env.S.dN;
			if (_v0 === 1) {
				return 'Paused';
			} else {
				return 'Active';
			}
		}();
		return _List_Nil;
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$displayTileMap = function (env) {
	var tileSizeF = $author$project$MainConfig$tileSize;
	var tileMap = env.bb.dT;
	var camera = env.bb.b;
	var _v0 = camera.ag;
	var sx = _v0.a;
	var sy = _v0.b;
	var _v1 = A3($elm$core$Tuple$mapBoth, $elm$core$Basics$toFloat, $elm$core$Basics$toFloat, camera.bZ);
	var cx = _v1.a;
	var cy = _v1.b;
	var _v2 = _Utils_Tuple2(cx - (sx / 2), cy - (sy / 2));
	var px1 = _v2.a;
	var py1 = _v2.b;
	var _v3 = _Utils_Tuple2(
		$elm$core$Basics$floor(px1 / tileSizeF),
		$elm$core$Basics$floor(py1 / tileSizeF));
	var cxid1 = _v3.a;
	var cyid1 = _v3.b;
	var _v4 = _Utils_Tuple2(cx + (sx / 2), cy + (sy / 2));
	var px2 = _v4.a;
	var py2 = _v4.b;
	var _v5 = _Utils_Tuple2(
		$elm$core$Basics$floor(px2 / tileSizeF),
		$elm$core$Basics$floor(py2 / tileSizeF));
	var cxid2 = _v5.a;
	var cyid2 = _v5.b;
	return A2(
		$linsyking$elm_canvas$Canvas$group,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$linsyking$elm_canvas$Canvas$group,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (_v8) {
						var row = _v8.a;
						var col = _v8.b;
						var t = _v8.c;
						var r = row;
						var c = col;
						return ((_Utils_cmp(
							A2(
								$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
								env,
								_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).a,
							-$author$project$MainConfig$tileSize) > -1) && ((_Utils_cmp(
							A2(
								$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
								env,
								_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).a,
							1920 + $author$project$MainConfig$tileSize) < 1) && ((_Utils_cmp(
							A2(
								$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
								env,
								_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).b,
							-$author$project$MainConfig$tileSize) > -1) && (_Utils_cmp(
							A2(
								$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
								env,
								_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)).b,
							1080 + $author$project$MainConfig$tileSize) < 1)))) ? A2(
							$linsyking$elm_canvas$Canvas$group,
							_List_fromArray(
								[
									$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false)
								]),
							_List_fromArray(
								[
									A5(
									$author$project$Lib$Render$Sprite$renderSprite,
									env.S,
									_List_Nil,
									A2(
										$author$project$SceneProtos$CoreEngine$Camera$Camera$posInCam,
										env,
										_Utils_Tuple2($author$project$MainConfig$tileSize * r, $author$project$MainConfig$tileSize * c)),
									A2(
										$author$project$SceneProtos$CoreEngine$Camera$Camera$sizeInCam,
										env,
										_Utils_Tuple2($author$project$MainConfig$tileSize, $author$project$MainConfig$tileSize)),
									'tile_' + $elm$core$String$fromInt(t))
								])) : $linsyking$elm_canvas$Canvas$empty;
					},
					A2(
						$elm$core$List$concatMap,
						$elm$core$Array$toList,
						$elm$core$Array$toList(
							A2(
								$tortus$elm_array_2d$Array2D$map,
								function (_v6) {
									var _v7 = _v6.a;
									var row = _v7.a;
									var col = _v7.b;
									var cell = _v6.b;
									return _Utils_Tuple3(row, col, cell);
								},
								A3(
									$author$project$Lib$Tools$ArrayTools$array2D_indexedSlice,
									_Utils_Tuple2(cxid1, cyid1),
									_Utils_Tuple2(cxid2, cyid2),
									tileMap)).cV))))
			]));
};
var $linsyking$messenger_core$Messenger$GeneralModel$viewModelList = F2(
	function (env, models) {
		return A2(
			$elm$core$List$map,
			function (model) {
				return A2(model.d2, env, model.cV);
			},
			models);
	});
var $author$project$SceneProtos$CoreEngine$GameComponent$Handler$viewGC = F2(
	function (env, xs) {
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var a = _v0.a;
					return a;
				},
				A2(
					$elm$core$List$sortBy,
					function (_v1) {
						var a = _v1.b;
						return a;
					},
					$elm$core$List$concat(
						A2($linsyking$messenger_core$Messenger$GeneralModel$viewModelList, env, xs)))));
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Model$viewModel = F2(
	function (env, model) {
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			_Utils_ap(
				_List_fromArray(
					[
						$author$project$SceneProtos$CoreEngine$GameLayer$Model$displayTileMap(env),
						A2($author$project$SceneProtos$CoreEngine$GameComponent$Handler$viewGC, env, model.bS)
					]),
				A2($author$project$SceneProtos$CoreEngine$GameLayer$Model$debug, env, model)));
	});
var $author$project$SceneProtos$CoreEngine$GameLayer$Export$initLayer = F2(
	function (env, i) {
		return {
			cV: A2($author$project$SceneProtos$CoreEngine$GameLayer$Model$initModel, env, i),
			dr: 'GameLayer',
			d$: $author$project$SceneProtos$CoreEngine$GameLayer$Model$updateModel,
			d0: $author$project$SceneProtos$CoreEngine$GameLayer$Model$updateModelRec,
			d2: $author$project$SceneProtos$CoreEngine$GameLayer$Model$viewModel
		};
	});
var $author$project$SceneProtos$CoreEngine$SceneInit$nullCoreEngineInit = {bS: _List_Nil};
var $author$project$SceneProtos$CoreEngine$Common$initModel = F2(
	function (env, init) {
		var layerInitData = function () {
			if (init.$ === 1) {
				var x = init.a;
				return x;
			} else {
				return $author$project$SceneProtos$CoreEngine$SceneInit$nullCoreEngineInit;
			}
		}();
		return {
			bb: A2($author$project$SceneProtos$CoreEngine$SceneInit$initCommonData, env, layerInitData),
			df: _List_fromArray(
				[
					$author$project$SceneProtos$CoreEngine$GameLayer$Global$getLayerT(
					A2(
						$author$project$SceneProtos$CoreEngine$GameLayer$Export$initLayer,
						A2($author$project$Lib$Env$Env$addCommonData, $author$project$SceneProtos$CoreEngine$LayerBase$nullCommonData, env),
						layerInitData))
				])
		};
	});
var $author$project$Lib$Scene$Base$SOMPlayAudio = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $author$project$Lib$Scene$Base$SOMStopAudio = function (a) {
	return {$: 3, a: a};
};
var $author$project$SceneProtos$CoreEngine$Model$handleLayerMsg = F3(
	function (env, lmsg, model) {
		switch (lmsg.$) {
			case 4:
				var name = lmsg.a;
				var path = lmsg.b;
				var opt = lmsg.c;
				return _Utils_Tuple3(
					model,
					_List_fromArray(
						[
							A3($author$project$Lib$Scene$Base$SOMPlayAudio, name, path, opt)
						]),
					env);
			case 5:
				var name = lmsg.a;
				return _Utils_Tuple3(
					model,
					_List_fromArray(
						[
							$author$project$Lib$Scene$Base$SOMStopAudio(name)
						]),
					env);
			default:
				return _Utils_Tuple3(model, _List_Nil, env);
		}
	});
var $author$project$Lib$Layer$LayerHandler$match = F2(
	function (l, t) {
		if (!t.$) {
			return false;
		} else {
			var n = t.a;
			return _Utils_eq(n, l.dr);
		}
	});
var $author$project$Lib$Layer$LayerHandler$super = function (t) {
	if (!t.$) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Lib$Layer$LayerHandler$update = F2(
	function (layer, env) {
		var _v0 = A2(layer.d$, env, layer.cV);
		var newData = _v0.a;
		var newMsgs = _v0.b;
		var newEnv = _v0.c;
		return _Utils_Tuple3(
			_Utils_update(
				layer,
				{cV: newData}),
			newMsgs,
			newEnv);
	});
var $author$project$Lib$Layer$LayerHandler$updaterec = F3(
	function (layer, env, lm) {
		var _v0 = A3(layer.d0, env, lm, layer.cV);
		var newData = _v0.a;
		var newMsgs = _v0.b;
		var newEnv = _v0.c;
		return _Utils_Tuple3(
			_Utils_update(
				layer,
				{cV: newData}),
			newMsgs,
			newEnv);
	});
var $author$project$Lib$Layer$LayerHandler$recBody = {cP: $author$project$Lib$Env$Env$cleanEnvC, dn: $author$project$Lib$Layer$LayerHandler$match, dQ: $author$project$Lib$Layer$LayerHandler$super, d$: $author$project$Lib$Layer$LayerHandler$update, d0: $author$project$Lib$Layer$LayerHandler$updaterec};
var $author$project$Lib$Layer$LayerHandler$updateLayer = function (env) {
	return A2($linsyking$messenger_core$Messenger$RecursionList$updateObjects, $author$project$Lib$Layer$LayerHandler$recBody, env);
};
var $author$project$SceneProtos$CoreEngine$Model$updateModel = F2(
	function (env, model) {
		var _v0 = env.w;
		switch (_v0.$) {
			case 0:
				var _v1 = A2(
					$author$project$Lib$Layer$LayerHandler$updateLayer,
					A2($author$project$Lib$Env$Env$addCommonData, model.bb, env),
					model.df);
				var newdata = _v1.a;
				var msgs = _v1.b;
				var newenv = _v1.c;
				var nmodel = _Utils_update(
					model,
					{bb: newenv.bb, df: newdata});
				var _v2 = A3(
					$elm$core$List$foldl,
					F2(
						function (x, _v3) {
							var y = _v3.a;
							var lmsg = _v3.b;
							var cgd = _v3.c;
							var _v4 = A3($author$project$SceneProtos$CoreEngine$Model$handleLayerMsg, cgd, x, y);
							var model2 = _v4.a;
							var msg2 = _v4.b;
							var env2 = _v4.c;
							return _Utils_Tuple3(
								model2,
								_Utils_ap(lmsg, msg2),
								env2);
						}),
					_Utils_Tuple3(nmodel, _List_Nil, newenv),
					msgs);
				var newmodel = _v2.a;
				var newsow = _v2.b;
				var newgd2 = _v2.c;
				return _Utils_Tuple3(
					newmodel,
					newsow,
					$author$project$Lib$Env$Env$noCommonData(newgd2));
			case 1:
				var key = _v0.a;
				var ogd = env.S;
				var ngd = _Utils_update(
					ogd,
					{
						dd: A3($elm$core$Array$set, key, true, ogd.dd),
						de: ogd.dd
					});
				return _Utils_Tuple3(
					model,
					_List_Nil,
					_Utils_update(
						env,
						{S: ngd}));
			case 2:
				var key = _v0.a;
				var ogd2 = env.S;
				return _Utils_Tuple3(
					model,
					_List_Nil,
					_Utils_update(
						env,
						{
							S: _Utils_update(
								ogd2,
								{
									dd: A3($elm$core$Array$set, key, false, ogd2.dd),
									de: ogd2.dd
								})
						}));
			case 9:
				var pos = _v0.a;
				var ogd = env.S;
				var ngd = _Utils_update(
					ogd,
					{dq: pos});
				return _Utils_Tuple3(
					model,
					_List_Nil,
					_Utils_update(
						env,
						{S: ngd}));
			case 7:
				var ogd = env.S;
				var ngd = _Utils_update(
					ogd,
					{dp: true});
				return _Utils_Tuple3(
					model,
					_List_Nil,
					_Utils_update(
						env,
						{S: ngd}));
			default:
				return _Utils_Tuple3(model, _List_Nil, env);
		}
	});
var $author$project$Lib$Layer$LayerHandler$viewLayer = F2(
	function (env, models) {
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			A2($linsyking$messenger_core$Messenger$GeneralModel$viewModelList, env, models));
	});
var $author$project$SceneProtos$CoreEngine$Model$viewModel = F2(
	function (env, model) {
		return A2(
			$author$project$Lib$Layer$LayerHandler$viewLayer,
			A2($author$project$Lib$Env$Env$addCommonData, model.bb, env),
			model.df);
	});
var $author$project$SceneProtos$CoreEngine$Export$genScene = function (im) {
	return {
		db: F2(
			function (env, i) {
				if (i.$ === 2) {
					var init = i.a;
					return A2(
						$author$project$SceneProtos$CoreEngine$Common$initModel,
						env,
						$author$project$Lib$Scene$Base$CoreEngineInitData(
							A2(im, env, init)));
				} else {
					return A2(
						$author$project$SceneProtos$CoreEngine$Common$initModel,
						env,
						$author$project$Lib$Scene$Base$CoreEngineInitData(
							A2(im, env, $author$project$Lib$Scene$Base$NullSceneMsg)));
				}
			}),
		d$: $author$project$SceneProtos$CoreEngine$Model$updateModel,
		d2: $author$project$SceneProtos$CoreEngine$Model$viewModel
	};
};
var $author$project$Scenes$Logo$LayerSettings$EmpData = function (a) {
	return {$: 0, a: a};
};
var $author$project$Scenes$Logo$Emp$Global$dataToLDT = function (data) {
	return $author$project$Scenes$Logo$LayerSettings$EmpData(data);
};
var $author$project$Scenes$Logo$Emp$Common$nullModel = {};
var $author$project$Scenes$Logo$Emp$Global$ldtToData = function (ldt) {
	if (!ldt.$) {
		var x = ldt.a;
		return x;
	} else {
		return $author$project$Scenes$Logo$Emp$Common$nullModel;
	}
};
var $author$project$Scenes$Logo$Emp$Global$getLayerT = function (layer) {
	var view = F2(
		function (env, ldt) {
			return A2(
				layer.d2,
				env,
				$author$project$Scenes$Logo$Emp$Global$ldtToData(ldt));
		});
	var updaterec = F3(
		function (env, lm, ldt) {
			var _v1 = A3(
				layer.d0,
				env,
				lm,
				$author$project$Scenes$Logo$Emp$Global$ldtToData(ldt));
			var rldt = _v1.a;
			var newmsg = _v1.b;
			var newenv = _v1.c;
			return _Utils_Tuple3(
				$author$project$Scenes$Logo$Emp$Global$dataToLDT(rldt),
				newmsg,
				newenv);
		});
	var update = F2(
		function (env, ldt) {
			var _v0 = A2(
				layer.d$,
				env,
				$author$project$Scenes$Logo$Emp$Global$ldtToData(ldt));
			var rldt = _v0.a;
			var newmsg = _v0.b;
			var newenv = _v0.c;
			return _Utils_Tuple3(
				$author$project$Scenes$Logo$Emp$Global$dataToLDT(rldt),
				newmsg,
				newenv);
		});
	return A5(
		$linsyking$messenger_core$Messenger$GeneralModel$GeneralModel,
		layer.dr,
		$author$project$Scenes$Logo$Emp$Global$dataToLDT(layer.cV),
		update,
		updaterec,
		view);
};
var $author$project$Scenes$Logo$LayerBase$nullCommonData = {};
var $author$project$Scenes$Logo$SceneInit$initCommonData = F2(
	function (_v0, _v1) {
		return $author$project$Scenes$Logo$LayerBase$nullCommonData;
	});
var $author$project$Scenes$Logo$Emp$Model$initModel = F2(
	function (_v0, _v1) {
		return $author$project$Scenes$Logo$Emp$Common$nullModel;
	});
var $author$project$Scenes$Logo$Emp$Model$updateModel = F2(
	function (env, model) {
		return _Utils_Tuple3(model, _List_Nil, env);
	});
var $author$project$Scenes$Logo$Emp$Model$updateModelRec = F3(
	function (env, _v0, model) {
		return _Utils_Tuple3(model, _List_Nil, env);
	});
var $author$project$Scenes$Logo$Emp$Model$viewModel = F2(
	function (_v0, _v1) {
		return $linsyking$elm_canvas$Canvas$empty;
	});
var $author$project$Scenes$Logo$Emp$Export$initLayer = F2(
	function (env, i) {
		return {
			cV: A2($author$project$Scenes$Logo$Emp$Model$initModel, env, i),
			dr: 'Emp',
			d$: $author$project$Scenes$Logo$Emp$Model$updateModel,
			d0: $author$project$Scenes$Logo$Emp$Model$updateModelRec,
			d2: $author$project$Scenes$Logo$Emp$Model$viewModel
		};
	});
var $author$project$Scenes$Logo$SceneInit$nullLogoInit = {};
var $author$project$Scenes$Logo$Common$initModel = F2(
	function (env, init) {
		var layerInitData = function () {
			if (!init.$) {
				var x = init.a;
				return x;
			} else {
				return $author$project$Scenes$Logo$SceneInit$nullLogoInit;
			}
		}();
		return {
			bb: A2($author$project$Scenes$Logo$SceneInit$initCommonData, env, layerInitData),
			df: _List_fromArray(
				[
					$author$project$Scenes$Logo$Emp$Global$getLayerT(
					A2(
						$author$project$Scenes$Logo$Emp$Export$initLayer,
						A2($author$project$Lib$Env$Env$addCommonData, $author$project$Scenes$Logo$LayerBase$nullCommonData, env),
						layerInitData))
				])
		};
	});
var $author$project$Lib$Scene$Base$SOMChangeScene = function (a) {
	return {$: 0, a: a};
};
var $author$project$Scenes$Logo$Model$handleLayerMsg = F3(
	function (env, lmsg, model) {
		switch (lmsg.$) {
			case 4:
				var name = lmsg.a;
				var path = lmsg.b;
				var opt = lmsg.c;
				return _Utils_Tuple3(
					model,
					_List_fromArray(
						[
							A3($author$project$Lib$Scene$Base$SOMPlayAudio, name, path, opt)
						]),
					env);
			case 5:
				var name = lmsg.a;
				return _Utils_Tuple3(
					model,
					_List_fromArray(
						[
							$author$project$Lib$Scene$Base$SOMStopAudio(name)
						]),
					env);
			default:
				return _Utils_Tuple3(model, _List_Nil, env);
		}
	});
var $author$project$Scenes$Logo$Model$updateModel = F2(
	function (env, model) {
		var changeScene = (env.Y > 180) ? _List_fromArray(
			[
				$author$project$Lib$Scene$Base$SOMChangeScene(
				_Utils_Tuple3($author$project$Lib$Scene$Base$NullSceneInitData, 'Home', $elm$core$Maybe$Nothing))
			]) : _List_Nil;
		var _v0 = A2(
			$author$project$Lib$Layer$LayerHandler$updateLayer,
			A2($author$project$Lib$Env$Env$addCommonData, model.bb, env),
			model.df);
		var newdata = _v0.a;
		var msgs = _v0.b;
		var newenv = _v0.c;
		var nmodel = _Utils_update(
			model,
			{bb: newenv.bb, df: newdata});
		var _v1 = A3(
			$elm$core$List$foldl,
			F2(
				function (x, _v2) {
					var y = _v2.a;
					var lmsg = _v2.b;
					var cgd = _v2.c;
					var _v3 = A3($author$project$Scenes$Logo$Model$handleLayerMsg, cgd, x, y);
					var model2 = _v3.a;
					var msg2 = _v3.b;
					var env2 = _v3.c;
					return _Utils_Tuple3(
						model2,
						_Utils_ap(lmsg, msg2),
						env2);
				}),
			_Utils_Tuple3(nmodel, _List_Nil, newenv),
			msgs);
		var newmodel = _v1.a;
		var newsow = _v1.b;
		var newgd2 = _v1.c;
		return _Utils_Tuple3(
			newmodel,
			_Utils_ap(newsow, changeScene),
			$author$project$Lib$Env$Env$noCommonData(newgd2));
	});
var $author$project$Scenes$Logo$Model$viewModel = F2(
	function (env, _v0) {
		var t = env.Y;
		var alv = A2(
			$elm$core$Basics$max,
			0,
			A2(
				$elm$core$Basics$min,
				1,
				(env.Y < 60) ? (t / 60) : ((env.Y > 120) ? ((180 - t) / 60) : 1)));
		return A2(
			$linsyking$elm_canvas$Canvas$group,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$linsyking$elm_canvas$Canvas$shapes,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$fill($avh4$elm_color$Color$black)
						]),
					_List_fromArray(
						[
							A3(
							$author$project$Lib$Render$Shape$rect,
							env.S,
							_Utils_Tuple2(0, 0),
							_Utils_Tuple2(1920, 1080))
						])),
					A5(
					$author$project$Lib$Render$Sprite$renderSprite,
					env.S,
					_List_fromArray(
						[
							$linsyking$elm_canvas$Canvas$Settings$Advanced$imageSmoothing(false),
							$linsyking$elm_canvas$Canvas$Settings$Advanced$alpha(alv)
						]),
					_Utils_Tuple2(0, 0),
					_Utils_Tuple2(1920, 1080),
					'logo')
				]));
	});
var $author$project$Scenes$Logo$Export$scene = {db: $author$project$Scenes$Logo$Common$initModel, d$: $author$project$Scenes$Logo$Model$updateModel, d2: $author$project$Scenes$Logo$Model$viewModel};
var $author$project$Scenes$SceneSettings$CoreEngineDataT = function (a) {
	return {$: 1, a: a};
};
var $author$project$SceneProtos$CoreEngine$Global$dataToSDT = function (d) {
	return $author$project$Scenes$SceneSettings$CoreEngineDataT(d);
};
var $author$project$SceneProtos$CoreEngine$Common$nullModel = {bb: $author$project$SceneProtos$CoreEngine$LayerBase$nullCommonData, df: _List_Nil};
var $author$project$SceneProtos$CoreEngine$Global$sdtToData = function (dt) {
	if (dt.$ === 1) {
		var x = dt.a;
		return x;
	} else {
		return $author$project$SceneProtos$CoreEngine$Common$nullModel;
	}
};
var $author$project$SceneProtos$CoreEngine$Global$sceneToST = function (sd) {
	var view = F2(
		function (env, sdt) {
			return A2(
				sd.d2,
				env,
				$author$project$SceneProtos$CoreEngine$Global$sdtToData(sdt));
		});
	var update = F2(
		function (env, sdt) {
			var _v0 = A2(
				sd.d$,
				env,
				$author$project$SceneProtos$CoreEngine$Global$sdtToData(sdt));
			var newm = _v0.a;
			var som = _v0.b;
			var newgd = _v0.c;
			return _Utils_Tuple3(
				$author$project$SceneProtos$CoreEngine$Global$dataToSDT(newm),
				som,
				newgd);
		});
	var init = F2(
		function (t, tm) {
			return $author$project$SceneProtos$CoreEngine$Global$dataToSDT(
				A2(sd.db, t, tm));
		});
	return {db: init, d$: update, d2: view};
};
var $author$project$Scenes$SceneSettings$LogoDataT = function (a) {
	return {$: 0, a: a};
};
var $author$project$Scenes$Logo$Global$dataToSDT = function (d) {
	return $author$project$Scenes$SceneSettings$LogoDataT(d);
};
var $author$project$Scenes$Logo$Common$nullModel = {bb: $author$project$Scenes$Logo$LayerBase$nullCommonData, df: _List_Nil};
var $author$project$Scenes$Logo$Global$sdtToData = function (dt) {
	if (!dt.$) {
		var x = dt.a;
		return x;
	} else {
		return $author$project$Scenes$Logo$Common$nullModel;
	}
};
var $author$project$Scenes$Logo$Global$sceneToST = function (sd) {
	var view = F2(
		function (env, sdt) {
			return A2(
				sd.d2,
				env,
				$author$project$Scenes$Logo$Global$sdtToData(sdt));
		});
	var update = F2(
		function (env, sdt) {
			var _v0 = A2(
				sd.d$,
				env,
				$author$project$Scenes$Logo$Global$sdtToData(sdt));
			var newm = _v0.a;
			var som = _v0.b;
			var newgd = _v0.c;
			return _Utils_Tuple3(
				$author$project$Scenes$Logo$Global$dataToSDT(newm),
				som,
				newgd);
		});
	var init = F2(
		function (t, tm) {
			return $author$project$Scenes$Logo$Global$dataToSDT(
				A2(sd.db, t, tm));
		});
	return {db: init, d$: update, d2: view};
};
var $author$project$Scenes$AllScenes$allScenes = _List_fromArray(
	[
		_Utils_Tuple2(
		'Logo',
		$author$project$Scenes$Logo$Global$sceneToST($author$project$Scenes$Logo$Export$scene)),
		_Utils_Tuple2(
		'Home',
		$author$project$SceneProtos$CoreEngine$Global$sceneToST(
			$author$project$SceneProtos$CoreEngine$Export$genScene($author$project$Scenes$Home$Export$game)))
	]);
var $author$project$Lib$Scene$Loader$getScene = function (i) {
	var scenes = $author$project$Scenes$AllScenes$allScenes;
	var tests = A2(
		$elm$core$List$filter,
		function (_v2) {
			var x = _v2.a;
			return _Utils_eq(x, i);
		},
		scenes);
	var head = $elm$core$List$head(tests);
	if (!head.$) {
		var _v1 = head.a;
		var x = _v1.b;
		return x;
	} else {
		return $author$project$Scenes$SceneSettings$nullSceneT;
	}
};
var $author$project$Lib$Scene$Loader$loadScene = F4(
	function (msg, model, cs, sid) {
		return _Utils_update(
			model,
			{
				cS: A2(
					cs.db,
					{S: model.P, w: msg, Y: model.dU},
					sid),
				cT: cs
			});
	});
var $author$project$Lib$Scene$Loader$loadSceneByName = F4(
	function (msg, model, name, sid) {
		var newModel = A4(
			$author$project$Lib$Scene$Loader$loadScene,
			msg,
			model,
			$author$project$Lib$Scene$Loader$getScene(name),
			sid);
		var gd = newModel.P;
		return _Utils_update(
			newModel,
			{
				P: _Utils_update(
					gd,
					{cT: name})
			});
	});
var $author$project$Lib$Coordinate$Coordinates$maxHandW = function (_v0) {
	var w = _v0.a;
	var h = _v0.b;
	return (_Utils_cmp(w / h, $author$project$Lib$Coordinate$Coordinates$plScale) > 0) ? _Utils_Tuple2(h * $author$project$Lib$Coordinate$Coordinates$plScale, h) : _Utils_Tuple2(w, w / $author$project$Lib$Coordinate$Coordinates$plScale);
};
var $author$project$Main$init = function (flags) {
	var oldIT = $author$project$Common$initGlobalData.dc;
	var ls = $author$project$Lib$LocalStorage$LocalStorage$decodeLSInfo(flags.da);
	var _v0 = $author$project$Lib$Coordinate$Coordinates$maxHandW(
		_Utils_Tuple2(flags.d6, flags.d5));
	var gw = _v0.a;
	var gh = _v0.b;
	var _v1 = $author$project$Lib$Coordinate$Coordinates$getStartPoint(
		_Utils_Tuple2(flags.d6, flags.d5));
	var fl = _v1.a;
	var ft = _v1.b;
	var newIT = _Utils_update(
		oldIT,
		{
			cM: _Utils_Tuple2(flags.d6, flags.d5),
			dx: gh,
			dA: gw,
			dK: fl,
			dM: ft
		});
	var newgd = _Utils_update(
		$author$project$Common$initGlobalData,
		{
			cU: $elm$time$Time$millisToPosix(flags.dV),
			dc: newIT,
			dh: ls
		});
	var ms = A4(
		$author$project$Lib$Scene$Loader$loadSceneByName,
		$author$project$Base$NullMsg,
		_Utils_update(
			$author$project$Main$initModel,
			{P: newgd}),
		$author$project$MainConfig$initScene,
		$author$project$MainConfig$initSceneSettings);
	return _Utils_Tuple3(
		_Utils_update(
			ms,
			{P: newgd}),
		$elm$core$Platform$Cmd$none,
		$MartinSStewart$elm_audio$Audio$cmdNone);
};
var $author$project$Base$KeyDown = function (a) {
	return {$: 1, a: a};
};
var $author$project$Base$KeyUp = function (a) {
	return {$: 2, a: a};
};
var $author$project$Base$MouseDown = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $author$project$Base$MouseMove = function (a) {
	return {$: 9, a: a};
};
var $author$project$Base$MouseUp = function (a) {
	return {$: 8, a: a};
};
var $author$project$Base$NewWindowSize = function (a) {
	return {$: 3, a: a};
};
var $author$project$Base$Prompt = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $author$project$Base$Tick = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {b2: processes, cv: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.b2;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.cv);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$browser$Browser$Events$Document = 0;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {bW: pids, ct: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {bi: event, by: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.bW,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.by;
		var event = _v0.bi;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.ct);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, 0, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, 0, 'keyup');
var $elm$browser$Browser$Events$onMouseDown = A2($elm$browser$Browser$Events$on, 0, 'mousedown');
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, 0, 'mousemove');
var $elm$browser$Browser$Events$onMouseUp = A2($elm$browser$Browser$Events$on, 0, 'mouseup');
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Lib$Tools$Browser$promptReceiver = _Platform_incomingPort(
	'promptReceiver',
	A2(
		$elm$json$Json$Decode$andThen,
		function (result) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (name) {
					return $elm$json$Json$Decode$succeed(
						{dr: name, dB: result});
				},
				A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$field, 'result', $elm$json$Json$Decode$string)));
var $author$project$MainConfig$timeInterval = 16;
var $author$project$Main$subscriptions = F2(
	function (_v0, _v1) {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					A2($elm$time$Time$every, $author$project$MainConfig$timeInterval, $author$project$Base$Tick),
					$elm$browser$Browser$Events$onKeyDown(
					A3(
						$elm$json$Json$Decode$map2,
						F2(
							function (x, rep) {
								return (!rep) ? $author$project$Base$KeyDown(x) : $author$project$Base$NullMsg;
							}),
						A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int),
						A2($elm$json$Json$Decode$field, 'repeat', $elm$json$Json$Decode$bool))),
					$elm$browser$Browser$Events$onKeyUp(
					A3(
						$elm$json$Json$Decode$map2,
						F2(
							function (x, rep) {
								return (!rep) ? $author$project$Base$KeyUp(x) : $author$project$Base$NullMsg;
							}),
						A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int),
						A2($elm$json$Json$Decode$field, 'repeat', $elm$json$Json$Decode$bool))),
					$elm$browser$Browser$Events$onResize(
					F2(
						function (w, h) {
							return $author$project$Base$NewWindowSize(
								_Utils_Tuple2(w, h));
						})),
					$elm$browser$Browser$Events$onMouseDown(
					A4(
						$elm$json$Json$Decode$map3,
						F3(
							function (b, x, y) {
								return A2(
									$author$project$Base$MouseDown,
									b,
									_Utils_Tuple2(x, y));
							}),
						A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int),
						A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
						A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float))),
					$elm$browser$Browser$Events$onMouseUp(
					A3(
						$elm$json$Json$Decode$map2,
						F2(
							function (x, y) {
								return $author$project$Base$MouseUp(
									_Utils_Tuple2(x, y));
							}),
						A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
						A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float))),
					$elm$browser$Browser$Events$onMouseMove(
					A3(
						$elm$json$Json$Decode$map2,
						F2(
							function (x, y) {
								return $author$project$Base$MouseMove(
									_Utils_Tuple2(x, y));
							}),
						A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
						A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float))),
					$author$project$Lib$Tools$Browser$promptReceiver(
					function (p) {
						return A2($author$project$Base$Prompt, p.dr, p.dB);
					})
				]));
	});
var $author$project$Base$PlaySoundGotTime = F4(
	function (a, b, c, d) {
		return {$: 5, a: a, b: b, c: c, d: d};
	});
var $author$project$Lib$Tools$Browser$alert = _Platform_outgoingPort('alert', $elm$json$Json$Encode$string);
var $author$project$Lib$Resources$SpriteSheets$allSpriteSheets = $elm$core$Dict$empty;
var $author$project$MainConfig$debug = false;
var $author$project$Lib$LocalStorage$LocalStorage$encodeLSInfo = function (info) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'volume',
					$elm$json$Json$Encode$float(info.d3))
				])));
};
var $author$project$Lib$Scene$Loader$existScene = function (i) {
	var scenes = $author$project$Scenes$AllScenes$allScenes;
	var tests = A2(
		$elm$core$List$filter,
		function (_v1) {
			var x = _v1.a;
			return _Utils_eq(x, i);
		},
		scenes);
	var _v0 = $elm$core$List$head(tests);
	if (!_v0.$) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Lib$Coordinate$Coordinates$posToVirtual = F2(
	function (gd, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var realWidth = gd.dc.dA;
		var realHeight = gd.dc.dx;
		return _Utils_Tuple2($author$project$MainConfig$plWidth * (x / realWidth), $author$project$MainConfig$plHeight * (y / realHeight));
	});
var $author$project$Lib$Coordinate$Coordinates$fromMouseToVirtual = F2(
	function (gd, _v0) {
		var px = _v0.a;
		var py = _v0.b;
		return A2(
			$author$project$Lib$Coordinate$Coordinates$posToVirtual,
			gd,
			_Utils_Tuple2(px - gd.dc.dK, py - gd.dc.dM));
	});
var $author$project$Base$SoundLoaded = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $author$project$Lib$Resources$Sprites$getResourcePath = function (x) {
	return 'assets/' + x;
};
var $author$project$Lib$Resources$Sprites$allTexture = _List_fromArray(
	[
		_Utils_Tuple2(
		'tile',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile.png')),
		_Utils_Tuple2(
		'enemy_test',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/enemy_test.png')),
		_Utils_Tuple2(
		'logo',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/logo.png')),
		_Utils_Tuple2(
		'title_bg',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/title_bg.png')),
		_Utils_Tuple2(
		'button_start_0',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/button_start_0.png')),
		_Utils_Tuple2(
		'button_start_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/button_start_1.png')),
		_Utils_Tuple2(
		'button_rules_0',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/button_rules_0.png')),
		_Utils_Tuple2(
		'button_rules_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/button_rules_1.png')),
		_Utils_Tuple2(
		'enemy_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/enemy_1.png')),
		_Utils_Tuple2(
		'enemy_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/enemy_2.png')),
		_Utils_Tuple2(
		'enemy_3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/enemy_3.png')),
		_Utils_Tuple2(
		'enemy_4',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/enemy_4.png')),
		_Utils_Tuple2(
		'enemy_5',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/enemy_5.png')),
		_Utils_Tuple2(
		'shooter',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/weapons/shooter.png')),
		_Utils_Tuple2(
		'saber',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/weapons/saber.png')),
		_Utils_Tuple2(
		'elite_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/idle/tile000.png')),
		_Utils_Tuple2(
		'elite_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/idle/tile001.png')),
		_Utils_Tuple2(
		'elite_3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/blink/tile008.png')),
		_Utils_Tuple2(
		'elite_4',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/blink/tile009.png')),
		_Utils_Tuple2(
		'elite_d1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile056.png')),
		_Utils_Tuple2(
		'elite_d2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile057.png')),
		_Utils_Tuple2(
		'elite_d3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile058.png')),
		_Utils_Tuple2(
		'elite_d4',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile059.png')),
		_Utils_Tuple2(
		'elite_d5',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile060.png')),
		_Utils_Tuple2(
		'elite_d6',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile061.png')),
		_Utils_Tuple2(
		'elite_d7',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile062.png')),
		_Utils_Tuple2(
		'elite_d8',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/enemies/elite_1/die/tile063.png')),
		_Utils_Tuple2(
		'scientist',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist.png')),
		_Utils_Tuple2(
		'scientist_walking_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_walking_1.png')),
		_Utils_Tuple2(
		'scientist_walking_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_walking_2.png')),
		_Utils_Tuple2(
		'scientist_walking_3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_walking_3.png')),
		_Utils_Tuple2(
		'scientist_walking_4',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_walking_4.png')),
		_Utils_Tuple2(
		'scientist_walking_5',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_walking_5.png')),
		_Utils_Tuple2(
		'scientist_walking_6',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_walking_6.png')),
		_Utils_Tuple2(
		'scientist_jumpingup_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_jumpingup_1.png')),
		_Utils_Tuple2(
		'scientist_jumpingup_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_jumpingup_2.png')),
		_Utils_Tuple2(
		'scientist_jumpingtop',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_jumpingtop.png')),
		_Utils_Tuple2(
		'scientist_jumpingdown',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_jumpingdown.png')),
		_Utils_Tuple2(
		'scientist_landingbuffer_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_landingbuffer_1.png')),
		_Utils_Tuple2(
		'scientist_landingbuffer_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/scientist/scientist_landingbuffer_2.png')),
		_Utils_Tuple2(
		'tile_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_1.png')),
		_Utils_Tuple2(
		'tile_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_2.png')),
		_Utils_Tuple2(
		'tile_3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_3.png')),
		_Utils_Tuple2(
		'tile_5',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_5.png')),
		_Utils_Tuple2(
		'tile_7',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_7.png')),
		_Utils_Tuple2(
		'tile_9',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_9.png')),
		_Utils_Tuple2(
		'tile_11',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_11.png')),
		_Utils_Tuple2(
		'tile_13',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_13.png')),
		_Utils_Tuple2(
		'tile_15',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_15.png')),
		_Utils_Tuple2(
		'tile_17',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_17.png')),
		_Utils_Tuple2(
		'tile_19',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_19.png')),
		_Utils_Tuple2(
		'tile_21',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_21.png')),
		_Utils_Tuple2(
		'tile_23',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_23.png')),
		_Utils_Tuple2(
		'tile_25',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_25.png')),
		_Utils_Tuple2(
		'tile_27',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_27.png')),
		_Utils_Tuple2(
		'tile_29',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_29.png')),
		_Utils_Tuple2(
		'tile_31',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_31.png')),
		_Utils_Tuple2(
		'tile_33',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_33.png')),
		_Utils_Tuple2(
		'tile_35',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_35.png')),
		_Utils_Tuple2(
		'tile_37',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_37.png')),
		_Utils_Tuple2(
		'tile_39',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_39.png')),
		_Utils_Tuple2(
		'tile_41',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_41.png')),
		_Utils_Tuple2(
		'tile_43',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_43.png')),
		_Utils_Tuple2(
		'tile_45',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_45.png')),
		_Utils_Tuple2(
		'tile_47',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_47.png')),
		_Utils_Tuple2(
		'tile_49',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_49.png')),
		_Utils_Tuple2(
		'tile_51',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_51.png')),
		_Utils_Tuple2(
		'tile_53',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_53.png')),
		_Utils_Tuple2(
		'tile_55',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_55.png')),
		_Utils_Tuple2(
		'tile_57',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_57.png')),
		_Utils_Tuple2(
		'tile_59',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_59.png')),
		_Utils_Tuple2(
		'tile_61',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_61.png')),
		_Utils_Tuple2(
		'tile_63',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_63.png')),
		_Utils_Tuple2(
		'tile_65',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_65.png')),
		_Utils_Tuple2(
		'tile_67',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_67.png')),
		_Utils_Tuple2(
		'tile_69',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_69.png')),
		_Utils_Tuple2(
		'tile_71',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_71.png')),
		_Utils_Tuple2(
		'tile_73',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_73.png')),
		_Utils_Tuple2(
		'tile_75',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_75.png')),
		_Utils_Tuple2(
		'tile_77',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_77.png')),
		_Utils_Tuple2(
		'tile_79',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_79.png')),
		_Utils_Tuple2(
		'tile_81',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_81.png')),
		_Utils_Tuple2(
		'tile_83',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_83.png')),
		_Utils_Tuple2(
		'tile_85',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_85.png')),
		_Utils_Tuple2(
		'tile_87',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_87.png')),
		_Utils_Tuple2(
		'tile_89',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_89.png')),
		_Utils_Tuple2(
		'tile_91',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_91.png')),
		_Utils_Tuple2(
		'tile_93',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_93.png')),
		_Utils_Tuple2(
		'tile_95',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_95.png')),
		_Utils_Tuple2(
		'tile_97',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_97.png')),
		_Utils_Tuple2(
		'tile_99',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_99.png')),
		_Utils_Tuple2(
		'tile_101',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_101.png')),
		_Utils_Tuple2(
		'tile_103',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_103.png')),
		_Utils_Tuple2(
		'tile_105',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/tile_105.png')),
		_Utils_Tuple2(
		'bullet_player',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/bullets/playerb.png')),
		_Utils_Tuple2(
		'bullet_enemy0',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/bullets/enemyb0.png')),
		_Utils_Tuple2(
		'bullet_enemy1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/bullets/enemyb1.png')),
		_Utils_Tuple2(
		'bullet_enemy2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/bullets/enemyb2.png')),
		_Utils_Tuple2(
		'bullet_enemy3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/bullets/enemyb3.png')),
		_Utils_Tuple2(
		'store',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/store.png')),
		_Utils_Tuple2(
		'small_health_potion',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/small_health_potion.png')),
		_Utils_Tuple2(
		'medium_health_potion',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/medium_health_potion.png')),
		_Utils_Tuple2(
		'large_health_potion',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/large_health_potion.png')),
		_Utils_Tuple2(
		'speed_potion',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/speed_potion.png')),
		_Utils_Tuple2(
		'speed_potion_none',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/speed_potion_none.png')),
		_Utils_Tuple2(
		'atk_potion',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/atk_potion.png')),
		_Utils_Tuple2(
		'atk_potion_none',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/potion/atk_potion_none.png')),
		_Utils_Tuple2(
		'port',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/tiles/port.png')),
		_Utils_Tuple2(
		'rules',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/Rules_page.png')),
		_Utils_Tuple2(
		'back',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/back.png')),
		_Utils_Tuple2(
		'chip_doubletrigger',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/chip_doubletrigger.png')),
		_Utils_Tuple2(
		'chip_scatter',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/chip_scatter.png')),
		_Utils_Tuple2(
		'chip_splash',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/chip_splash.png')),
		_Utils_Tuple2(
		'chip_empty',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/chip_empty.png')),
		_Utils_Tuple2(
		'coin_gold_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_gold_1.png')),
		_Utils_Tuple2(
		'coin_gold_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_gold_2.png')),
		_Utils_Tuple2(
		'coin_gold_3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_gold_3.png')),
		_Utils_Tuple2(
		'coin_gold_4',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_gold_4.png')),
		_Utils_Tuple2(
		'coin_gold_5',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_gold_5.png')),
		_Utils_Tuple2(
		'coin_silver_1',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_silver_1.png')),
		_Utils_Tuple2(
		'coin_silver_2',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_silver_2.png')),
		_Utils_Tuple2(
		'coin_silver_3',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_silver_3.png')),
		_Utils_Tuple2(
		'coin_silver_4',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_silver_4.png')),
		_Utils_Tuple2(
		'coin_silver_5',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/chips/coin_silver_5.png')),
		_Utils_Tuple2(
		'upgrade_menu',
		$author$project$Lib$Resources$Sprites$getResourcePath('img/upgradeMenu.png'))
	]);
var $MartinSStewart$elm_audio$Audio$cmdBatch = function (audioCmds) {
	return $MartinSStewart$elm_audio$Audio$AudioCmdGroup(audioCmds);
};
var $author$project$Lib$Scene$Loader$getCurrentScene = function (model) {
	return model.cT;
};
var $MartinSStewart$elm_audio$Audio$AudioLoadRequest = function (a) {
	return {$: 0, a: a};
};
var $MartinSStewart$elm_audio$Audio$ErrorThatHappensWhenYouLoadMoreThan1000SoundsDueToHackyWorkAroundToMakeThisPackageBehaveMoreLikeAnEffectPackage = 3;
var $MartinSStewart$elm_audio$Audio$enumeratedResults = A2(
	$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	$elm$core$Result$Err(3),
	_Utils_ap(
		_List_fromArray(
			[
				$elm$core$Result$Err(0),
				$elm$core$Result$Err(1),
				$elm$core$Result$Err(2)
			]),
		A2(
			$elm$core$List$map,
			function (bufferId) {
				return $elm$core$Result$Ok(
					{ab: bufferId});
			},
			A2($elm$core$List$range, 0, 1000))));
var $MartinSStewart$elm_audio$Audio$loadAudio = F2(
	function (userMsg, url) {
		return $MartinSStewart$elm_audio$Audio$AudioLoadRequest(
			{
				aa: url,
				B: A2(
					$mgold$elm_nonempty_list$List$Nonempty$map,
					function (results) {
						return _Utils_Tuple2(
							results,
							userMsg(results));
					},
					$MartinSStewart$elm_audio$Audio$enumeratedResults)
			});
	});
var $author$project$Lib$Tools$Browser$prompt = _Platform_outgoingPort(
	'prompt',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					$elm$json$Json$Encode$string($.dr)),
					_Utils_Tuple2(
					'title',
					$elm$json$Json$Encode$string($.dW))
				]));
	});
var $author$project$Common$resetSceneStartTime = function (m) {
	var ogd = m.P;
	var ngd = _Utils_update(
		ogd,
		{dE: 0});
	return _Utils_update(
		m,
		{P: ngd});
};
var $author$project$Lib$LocalStorage$LocalStorage$sendInfo = _Platform_outgoingPort('sendInfo', $elm$json$Json$Encode$string);
var $author$project$Lib$Audio$Audio$stopAudio = F2(
	function (repo, s) {
		return A2(
			$elm$core$List$filter,
			function (_v0) {
				var name = _v0.a;
				return !_Utils_eq(name, s);
			},
			repo);
	});
var $author$project$Common$updateSceneStartTime = function (m) {
	var ogd = m.P;
	var ngd = _Utils_update(
		ogd,
		{dE: ogd.dE + 1});
	return _Utils_update(
		m,
		{P: ngd});
};
var $author$project$Main$gameUpdate = F2(
	function (msg, model) {
		if (_Utils_cmp(
			$elm$core$List$length(
				$elm$core$Dict$keys(model.P.dc.dH)),
			$elm$core$List$length($author$project$Lib$Resources$Sprites$allTexture)) < 0) {
			return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $MartinSStewart$elm_audio$Audio$cmdNone);
		} else {
			var oldLocalStorage = model.P.dh;
			var _v0 = A2(
				$author$project$Lib$Scene$Loader$getCurrentScene(model).d$,
				{S: model.P, w: msg, Y: model.dU},
				model.cS);
			var sdt = _v0.a;
			var som = _v0.b;
			var newenv = _v0.c;
			var newGD1 = newenv.S;
			var timeUpdatedModel = function () {
				if (!msg.$) {
					return _Utils_update(
						model,
						{P: newGD1, dU: model.dU + 1});
				} else {
					return _Utils_update(
						model,
						{P: newGD1});
				}
			}();
			var newModel = $author$project$Common$updateSceneStartTime(
				_Utils_update(
					timeUpdatedModel,
					{cS: sdt}));
			var _v1 = A3(
				$elm$core$List$foldl,
				F2(
					function (singleSOM, _v2) {
						var lastModel = _v2.a;
						var lastCmds = _v2.b;
						var lastAudioCmds = _v2.c;
						switch (singleSOM.$) {
							case 0:
								if (singleSOM.a.c.$ === 1) {
									var _v4 = singleSOM.a;
									var tm = _v4.a;
									var s = _v4.b;
									var _v5 = _v4.c;
									return _Utils_Tuple3(
										$author$project$Common$resetSceneStartTime(
											A4($author$project$Lib$Scene$Loader$loadSceneByName, msg, lastModel, s, tm)),
										lastCmds,
										lastAudioCmds);
								} else {
									var _v6 = singleSOM.a;
									var tm = _v6.a;
									var s = _v6.b;
									var trans = _v6.c.a;
									return _Utils_Tuple3(
										_Utils_update(
											lastModel,
											{
												dZ: $elm$core$Maybe$Just(
													_Utils_Tuple2(
														trans,
														_Utils_Tuple2(s, tm)))
											}),
										lastCmds,
										lastAudioCmds);
								}
							case 1:
								var name = singleSOM.a;
								var path = singleSOM.b;
								var opt = singleSOM.c;
								return _Utils_Tuple3(
									lastModel,
									lastCmds,
									_Utils_ap(
										lastAudioCmds,
										_List_fromArray(
											[
												A2(
												$MartinSStewart$elm_audio$Audio$loadAudio,
												A2($author$project$Base$SoundLoaded, name, opt),
												path)
											])));
							case 4:
								var s = singleSOM.a;
								var oldgd = lastModel.P;
								var oldLS = oldgd.dh;
								var newgd2 = _Utils_update(
									oldgd,
									{
										dh: _Utils_update(
											oldLS,
											{d3: s})
									});
								return _Utils_Tuple3(
									_Utils_update(
										lastModel,
										{P: newgd2}),
									lastCmds,
									lastAudioCmds);
							case 3:
								var name = singleSOM.a;
								return _Utils_Tuple3(
									_Utils_update(
										lastModel,
										{
											aT: A2($author$project$Lib$Audio$Audio$stopAudio, lastModel.aT, name)
										}),
									lastCmds,
									lastAudioCmds);
							case 2:
								var text = singleSOM.a;
								return _Utils_Tuple3(
									lastModel,
									_Utils_ap(
										lastCmds,
										_List_fromArray(
											[
												$author$project$Lib$Tools$Browser$alert(text)
											])),
									lastAudioCmds);
							default:
								var name = singleSOM.a;
								var title = singleSOM.b;
								return _Utils_Tuple3(
									lastModel,
									_Utils_ap(
										lastCmds,
										_List_fromArray(
											[
												$author$project$Lib$Tools$Browser$prompt(
												{dr: name, dW: title})
											])),
									lastAudioCmds);
						}
					}),
				_Utils_Tuple3(newModel, _List_Nil, _List_Nil),
				som);
			var newmodel = _v1.a;
			var cmds = _v1.b;
			var audiocmds = _v1.c;
			var newmodel2 = function () {
				var _v7 = newmodel.dZ;
				if (!_v7.$) {
					var _v8 = _v7.a;
					var trans = _v8.a;
					var _v9 = _v8.b;
					var d = _v9.a;
					var n = _v9.b;
					return _Utils_eq(trans.ap, trans.au) ? $author$project$Common$resetSceneStartTime(
						A4($author$project$Lib$Scene$Loader$loadSceneByName, msg, newmodel, d, n)) : newmodel;
				} else {
					return newmodel;
				}
			}();
			return _Utils_Tuple3(
				newmodel2,
				$elm$core$Platform$Cmd$batch(
					(!_Utils_eq(newmodel2.P.dh, oldLocalStorage)) ? A2(
						$elm$core$List$cons,
						$author$project$Lib$LocalStorage$LocalStorage$sendInfo(
							$author$project$Lib$LocalStorage$LocalStorage$encodeLSInfo(newmodel2.P.dh)),
						cmds) : cmds),
				$MartinSStewart$elm_audio$Audio$cmdBatch(audiocmds));
		}
	});
var $author$project$Lib$Audio$Audio$loadAudio = F5(
	function (repo, name, source, opt, t) {
		var filterrepo = A2(
			$elm$core$List$filter,
			function (_v0) {
				var n = _v0.a;
				return !_Utils_eq(n, name);
			},
			repo);
		return _Utils_ap(
			filterrepo,
			_List_fromArray(
				[
					_Utils_Tuple3(
					name,
					source,
					_Utils_Tuple2(opt, t))
				]));
	});
var $author$project$Lib$Resources$Base$saveSprite = F3(
	function (dst, name, text) {
		return A3($elm$core$Dict$insert, name, text, dst);
	});
var $linsyking$elm_canvas$Canvas$Internal$Texture$TSprite = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$Texture$sprite = F2(
	function (data, texture) {
		if (!texture.$) {
			var image = texture.a;
			return A2($linsyking$elm_canvas$Canvas$Internal$Texture$TSprite, data, image);
		} else {
			var image = texture.b;
			return A2($linsyking$elm_canvas$Canvas$Internal$Texture$TSprite, data, image);
		}
	});
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$Main$update = F3(
	function (_v0, msg, model) {
		var gd = model.P;
		_v1$14:
		while (true) {
			switch (msg.$) {
				case 6:
					if (msg.b.$ === 1) {
						var name = msg.a;
						var _v2 = msg.b;
						return _Utils_Tuple3(
							model,
							$author$project$Lib$Tools$Browser$alert('Failed to load sprite ' + name),
							$MartinSStewart$elm_audio$Audio$cmdNone);
					} else {
						var name = msg.a;
						var t = msg.b.a;
						var newgd = function () {
							var _v3 = A2($elm$core$Dict$get, name, $author$project$Lib$Resources$SpriteSheets$allSpriteSheets);
							if (!_v3.$) {
								var sprites = _v3.a;
								return A3(
									$elm$core$List$foldl,
									F2(
										function (_v4, lastgd) {
											var n = _v4.a;
											var s = _v4.b;
											var oldIT = lastgd.dc;
											var _v5 = s.dz;
											var x = _v5.a;
											var y = _v5.b;
											var _v6 = s.dy;
											var w = _v6.a;
											var h = _v6.b;
											var newTexture = A2(
												$linsyking$elm_canvas$Canvas$Texture$sprite,
												{bl: h, cC: w, d8: x, d9: y},
												t);
											var newIT = _Utils_update(
												oldIT,
												{
													dH: A3($author$project$Lib$Resources$Base$saveSprite, oldIT.dH, name + ('.' + n), newTexture)
												});
											return _Utils_update(
												lastgd,
												{dc: newIT});
										}),
									gd,
									sprites);
							} else {
								var oldIT = gd.dc;
								var newIT = _Utils_update(
									oldIT,
									{
										dH: A3($author$project$Lib$Resources$Base$saveSprite, oldIT.dH, name, t)
									});
								return _Utils_update(
									gd,
									{dc: newIT});
							}
						}();
						return _Utils_Tuple3(
							_Utils_update(
								model,
								{P: newgd}),
							$elm$core$Platform$Cmd$none,
							$MartinSStewart$elm_audio$Audio$cmdNone);
					}
				case 4:
					var name = msg.a;
					var opt = msg.b;
					var result = msg.c;
					if (!result.$) {
						var sound = result.a;
						return _Utils_Tuple3(
							model,
							A2(
								$elm$core$Task$perform,
								A3($author$project$Base$PlaySoundGotTime, name, opt, sound),
								$elm$time$Time$now),
							$MartinSStewart$elm_audio$Audio$cmdNone);
					} else {
						return _Utils_Tuple3(
							model,
							$author$project$Lib$Tools$Browser$alert('Failed to load audio ' + name),
							$MartinSStewart$elm_audio$Audio$cmdNone);
					}
				case 5:
					var name = msg.a;
					var opt = msg.b;
					var sound = msg.c;
					var t = msg.d;
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								aT: A5($author$project$Lib$Audio$Audio$loadAudio, model.aT, name, sound, opt, t)
							}),
						$elm$core$Platform$Cmd$none,
						$MartinSStewart$elm_audio$Audio$cmdNone);
				case 3:
					var t = msg.a;
					var oldIT = gd.dc;
					var _v8 = $author$project$Lib$Coordinate$Coordinates$maxHandW(t);
					var gw = _v8.a;
					var gh = _v8.b;
					var _v9 = $author$project$Lib$Coordinate$Coordinates$getStartPoint(t);
					var fl = _v9.a;
					var ft = _v9.b;
					var newIT = _Utils_update(
						oldIT,
						{cM: t, dx: gh, dA: gw, dK: fl, dM: ft});
					var newgd = _Utils_update(
						gd,
						{dc: newIT});
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{P: newgd}),
						$elm$core$Platform$Cmd$none,
						$MartinSStewart$elm_audio$Audio$cmdNone);
				case 9:
					var _v10 = msg.a;
					var px = _v10.a;
					var py = _v10.b;
					var mp = A2(
						$author$project$Lib$Coordinate$Coordinates$fromMouseToVirtual,
						gd,
						_Utils_Tuple2(px, py));
					return _Utils_Tuple3(
						_Utils_update(
							model,
							{
								P: _Utils_update(
									gd,
									{dq: mp})
							}),
						$elm$core$Platform$Cmd$none,
						$MartinSStewart$elm_audio$Audio$cmdNone);
				case 7:
					var e = msg.a;
					var pos = msg.b;
					return A2(
						$author$project$Main$gameUpdate,
						A2(
							$author$project$Base$MouseDown,
							e,
							A2($author$project$Lib$Coordinate$Coordinates$fromMouseToVirtual, model.P, pos)),
						model);
				case 8:
					var pos = msg.a;
					return A2(
						$author$project$Main$gameUpdate,
						$author$project$Base$MouseUp(
							A2($author$project$Lib$Coordinate$Coordinates$fromMouseToVirtual, model.P, pos)),
						model);
				case 1:
					switch (msg.a) {
						case 112:
							return $author$project$MainConfig$debug ? _Utils_Tuple3(
								model,
								$author$project$Lib$Tools$Browser$prompt(
									{dr: 'load', dW: 'Enter the scene you want to load'}),
								$MartinSStewart$elm_audio$Audio$cmdNone) : A2($author$project$Main$gameUpdate, msg, model);
						case 113:
							return $author$project$MainConfig$debug ? _Utils_Tuple3(
								model,
								$author$project$Lib$Tools$Browser$prompt(
									{dr: 'setVolume', dW: 'Set volume (0-1)'}),
								$MartinSStewart$elm_audio$Audio$cmdNone) : A2($author$project$Main$gameUpdate, msg, model);
						default:
							break _v1$14;
					}
				case 10:
					switch (msg.a) {
						case 'load':
							var result = msg.b;
							return $author$project$Lib$Scene$Loader$existScene(result) ? _Utils_Tuple3(
								$author$project$Common$resetSceneStartTime(
									A4($author$project$Lib$Scene$Loader$loadSceneByName, msg, model, result, $author$project$Lib$Scene$Base$NullSceneInitData)),
								$elm$core$Platform$Cmd$none,
								$MartinSStewart$elm_audio$Audio$cmdNone) : _Utils_Tuple3(
								model,
								$author$project$Lib$Tools$Browser$alert('Scene not found!'),
								$MartinSStewart$elm_audio$Audio$cmdNone);
						case 'setVolume':
							var result = msg.b;
							var vol = $elm$core$String$toFloat(result);
							if (!vol.$) {
								var v = vol.a;
								var ls = gd.dh;
								var newls = _Utils_update(
									ls,
									{d3: v});
								var newGd = _Utils_update(
									gd,
									{dh: newls});
								return _Utils_Tuple3(
									_Utils_update(
										model,
										{P: newGd}),
									$author$project$Lib$LocalStorage$LocalStorage$sendInfo(
										$author$project$Lib$LocalStorage$LocalStorage$encodeLSInfo(newls)),
									$MartinSStewart$elm_audio$Audio$cmdNone);
							} else {
								return _Utils_Tuple3(
									model,
									$author$project$Lib$Tools$Browser$alert('Not a number'),
									$MartinSStewart$elm_audio$Audio$cmdNone);
							}
						default:
							break _v1$14;
					}
				case 0:
					var x = msg.a;
					var trans = model.dZ;
					var newTrans = function () {
						if (!trans.$) {
							var _v13 = trans.a;
							var data = _v13.a;
							var sd = _v13.b;
							return (_Utils_cmp(data.ap, data.bs + data.au) > -1) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
								_Utils_Tuple2(
									_Utils_update(
										data,
										{ap: data.ap + 1}),
									sd));
						} else {
							return trans;
						}
					}();
					var newGD = _Utils_update(
						gd,
						{cU: x});
					return A2(
						$author$project$Main$gameUpdate,
						msg,
						_Utils_update(
							model,
							{P: newGD, dZ: newTrans}));
				case 11:
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $MartinSStewart$elm_audio$Audio$cmdNone);
				default:
					break _v1$14;
			}
		}
		return A2($author$project$Main$gameUpdate, msg, model);
	});
var $linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableClear = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $linsyking$elm_canvas$Canvas$clear = F3(
	function (point, w, h) {
		return {
			l: _List_Nil,
			q: $linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified,
			r: A3($linsyking$elm_canvas$Canvas$Internal$Canvas$DrawableClear, point, w, h)
		};
	});
var $author$project$MainConfig$background = function (gd) {
	return A3(
		$linsyking$elm_canvas$Canvas$clear,
		_Utils_Tuple2(0, 0),
		gd.dc.dA,
		gd.dc.dx);
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Base$TextureLoaded = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$Internal$Texture$TSImageUrl = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $linsyking$elm_canvas$Canvas$Texture$loadFromImageUrl = F2(
	function (url, onLoad) {
		return A2($linsyking$elm_canvas$Canvas$Internal$Texture$TSImageUrl, url, onLoad);
	});
var $author$project$Lib$Resources$Base$getTexture = A2(
	$elm$core$List$map,
	function (_v0) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$linsyking$elm_canvas$Canvas$Texture$loadFromImageUrl,
			y,
			$author$project$Base$TextureLoaded(x));
	},
	$author$project$Lib$Resources$Sprites$allTexture);
var $author$project$Lib$Scene$Transition$makeTransition = F3(
	function (gd, trans, ren) {
		if (!trans.$) {
			var data = trans.a;
			return (_Utils_cmp(data.ap, data.au) < 0) ? A3(data.c3, gd, ren, data.ap / data.au) : ((_Utils_cmp(data.ap, data.au + data.bs) < 0) ? A3(data.c2, gd, ren, (data.ap - data.au) / data.bs) : ren);
		} else {
			return ren;
		}
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$canvas = _VirtualDom_node('canvas');
var $linsyking$elm_canvas$Canvas$cnvs = A2($elm$html$Html$canvas, _List_Nil, _List_Nil);
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $elm$html$Html$Attributes$property = $elm$virtual_dom$VirtualDom$property;
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$commands = function (list) {
	return A2(
		$elm$html$Html$Attributes$property,
		'cmds',
		A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, list));
};
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$empty = _List_Nil;
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$beginPath = A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn, 'beginPath', _List_Nil);
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$var = F3(
	function (name, init, modifiers) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('variable')),
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(name)),
					_Utils_Tuple2('init', init),
					_Utils_Tuple2(
					'modifiers',
					A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, modifiers))
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$encodeStyle = F2(
	function (fieldKey, style) {
		var adaptStops = $elm$core$List$map(
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn('addColorStop'),
					function (_v1) {
						var offset = _v1.a;
						var color = _v1.b;
						return _List_fromArray(
							[offset, color]);
					}),
				A2(
					$elm$core$Tuple$mapBoth,
					$elm$json$Json$Encode$float,
					A2($elm$core$Basics$composeR, $avh4$elm_color$Color$toCssString, $elm$json$Json$Encode$string))));
		switch (style.$) {
			case 0:
				var color = style.a;
				return A2(
					$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$field,
					fieldKey,
					$elm$json$Json$Encode$string(
						$avh4$elm_color$Color$toCssString(color)));
			case 1:
				var spec = style.a;
				var stops = style.b;
				return A3(
					$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$var,
					fieldKey,
					A2(
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
						'createLinearGradient',
						_List_fromArray(
							[
								$elm$json$Json$Encode$float(spec.cD),
								$elm$json$Json$Encode$float(spec.cF),
								$elm$json$Json$Encode$float(spec.cE),
								$elm$json$Json$Encode$float(spec.cG)
							])),
					adaptStops(stops));
			default:
				var spec = style.a;
				var stops = style.b;
				return A3(
					$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$var,
					fieldKey,
					A2(
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
						'createRadialGradient',
						_List_fromArray(
							[
								$elm$json$Json$Encode$float(spec.cD),
								$elm$json$Json$Encode$float(spec.cF),
								$elm$json$Json$Encode$float(spec.dv),
								$elm$json$Json$Encode$float(spec.cE),
								$elm$json$Json$Encode$float(spec.cG),
								$elm$json$Json$Encode$float(spec.dw)
							])),
					adaptStops(stops));
		}
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillStyleEx = $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$encodeStyle('fillStyle');
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$clearRect = F4(
	function (x, y, width, height) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'clearRect',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y),
					$elm$json$Json$Encode$float(width),
					$elm$json$Json$Encode$float(height)
				]));
	});
var $linsyking$elm_canvas$Canvas$renderClear = F4(
	function (_v0, w, h, cmds) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$elm$core$List$cons,
			A4($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$clearRect, x, y, w, h),
			cmds);
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$arc = F6(
	function (x, y, radius, startAngle, endAngle, anticlockwise) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'arc',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y),
					$elm$json$Json$Encode$float(radius),
					$elm$json$Json$Encode$float(startAngle),
					$elm$json$Json$Encode$float(endAngle),
					$elm$json$Json$Encode$bool(anticlockwise)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$circle = F3(
	function (x, y, r) {
		return A6($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$arc, x, y, r, 0, 2 * $elm$core$Basics$pi, false);
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo = F2(
	function (x, y) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'moveTo',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$rect = F4(
	function (x, y, w, h) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'rect',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y),
					$elm$json$Json$Encode$float(w),
					$elm$json$Json$Encode$float(h)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$arcTo = F5(
	function (x1, y1, x2, y2, radius) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'arcTo',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x1),
					$elm$json$Json$Encode$float(y1),
					$elm$json$Json$Encode$float(x2),
					$elm$json$Json$Encode$float(y2),
					$elm$json$Json$Encode$float(radius)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$bezierCurveTo = F6(
	function (cp1x, cp1y, cp2x, cp2y, x, y) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'bezierCurveTo',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(cp1x),
					$elm$json$Json$Encode$float(cp1y),
					$elm$json$Json$Encode$float(cp2x),
					$elm$json$Json$Encode$float(cp2y),
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$lineTo = F2(
	function (x, y) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'lineTo',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$quadraticCurveTo = F4(
	function (cpx, cpy, x, y) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'quadraticCurveTo',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(cpx),
					$elm$json$Json$Encode$float(cpy),
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y)
				]));
	});
var $linsyking$elm_canvas$Canvas$renderLineSegment = F2(
	function (segment, cmds) {
		switch (segment.$) {
			case 0:
				var _v1 = segment.a;
				var x = _v1.a;
				var y = _v1.b;
				var _v2 = segment.b;
				var x2 = _v2.a;
				var y2 = _v2.b;
				var radius = segment.c;
				return A2(
					$elm$core$List$cons,
					A5($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$arcTo, x, y, x2, y2, radius),
					cmds);
			case 1:
				var _v3 = segment.a;
				var cp1x = _v3.a;
				var cp1y = _v3.b;
				var _v4 = segment.b;
				var cp2x = _v4.a;
				var cp2y = _v4.b;
				var _v5 = segment.c;
				var x = _v5.a;
				var y = _v5.b;
				return A2(
					$elm$core$List$cons,
					A6($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$bezierCurveTo, cp1x, cp1y, cp2x, cp2y, x, y),
					cmds);
			case 2:
				var _v6 = segment.a;
				var x = _v6.a;
				var y = _v6.b;
				return A2(
					$elm$core$List$cons,
					A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$lineTo, x, y),
					cmds);
			case 3:
				var _v7 = segment.a;
				var x = _v7.a;
				var y = _v7.b;
				return A2(
					$elm$core$List$cons,
					A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo, x, y),
					cmds);
			default:
				var _v8 = segment.a;
				var cpx = _v8.a;
				var cpy = _v8.b;
				var _v9 = segment.b;
				var x = _v9.a;
				var y = _v9.b;
				return A2(
					$elm$core$List$cons,
					A4($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$quadraticCurveTo, cpx, cpy, x, y),
					cmds);
		}
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$roundRect = F5(
	function (x, y, w, h, r) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'roundRect',
			_List_fromArray(
				[
					$elm$json$Json$Encode$float(x),
					$elm$json$Json$Encode$float(y),
					$elm$json$Json$Encode$float(w),
					$elm$json$Json$Encode$float(h),
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, r)
				]));
	});
var $linsyking$elm_canvas$Canvas$renderShape = F2(
	function (shape, cmds) {
		switch (shape.$) {
			case 0:
				var _v1 = shape.a;
				var x = _v1.a;
				var y = _v1.b;
				var w = shape.b;
				var h = shape.c;
				return A2(
					$elm$core$List$cons,
					A4($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$rect, x, y, w, h),
					A2(
						$elm$core$List$cons,
						A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo, x, y),
						cmds));
			case 1:
				var _v2 = shape.a;
				var x = _v2.a;
				var y = _v2.b;
				var w = shape.b;
				var h = shape.c;
				var r = shape.d;
				return A2(
					$elm$core$List$cons,
					A5($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$roundRect, x, y, w, h, r),
					A2(
						$elm$core$List$cons,
						A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo, x, y),
						cmds));
			case 2:
				var _v3 = shape.a;
				var x = _v3.a;
				var y = _v3.b;
				var r = shape.b;
				return A2(
					$elm$core$List$cons,
					A3($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$circle, x, y, r),
					A2(
						$elm$core$List$cons,
						A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo, x + r, y),
						cmds));
			case 3:
				var _v4 = shape.a;
				var x = _v4.a;
				var y = _v4.b;
				var segments = shape.b;
				return A3(
					$elm$core$List$foldl,
					$linsyking$elm_canvas$Canvas$renderLineSegment,
					A2(
						$elm$core$List$cons,
						A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo, x, y),
						cmds),
					segments);
			default:
				var _v5 = shape.a;
				var x = _v5.a;
				var y = _v5.b;
				var radius = shape.b;
				var startAngle = shape.c;
				var endAngle = shape.d;
				var anticlockwise = shape.e;
				return A2(
					$elm$core$List$cons,
					A2(
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo,
						x + (radius * $elm$core$Basics$cos(endAngle)),
						y + (radius * $elm$core$Basics$sin(endAngle))),
					A2(
						$elm$core$List$cons,
						A6($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$arc, x, y, radius, startAngle, endAngle, anticlockwise),
						A2(
							$elm$core$List$cons,
							A2(
								$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$moveTo,
								x + (radius * $elm$core$Basics$cos(startAngle)),
								y + (radius * $elm$core$Basics$sin(startAngle))),
							cmds)));
		}
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$NonZero = 0;
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillRuleToString = function (fillRule) {
	if (!fillRule) {
		return 'nonzero';
	} else {
		return 'evenodd';
	}
};
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fill = function (fillRule) {
	return A2(
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
		'fill',
		_List_fromArray(
			[
				$elm$json$Json$Encode$string(
				$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillRuleToString(fillRule))
			]));
};
var $linsyking$elm_canvas$Canvas$renderShapeFill = F2(
	function (maybeStyle, cmds) {
		return A2(
			$elm$core$List$cons,
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fill(0),
			function () {
				if (!maybeStyle.$) {
					var style = maybeStyle.a;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillStyleEx(style),
						cmds);
				} else {
					return cmds;
				}
			}());
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$stroke = A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn, 'stroke', _List_Nil);
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeStyleEx = $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$encodeStyle('strokeStyle');
var $linsyking$elm_canvas$Canvas$renderShapeStroke = F2(
	function (maybeStyle, cmds) {
		return A2(
			$elm$core$List$cons,
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$stroke,
			function () {
				if (!maybeStyle.$) {
					var style = maybeStyle.a;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeStyleEx(style),
						cmds);
				} else {
					return cmds;
				}
			}());
	});
var $linsyking$elm_canvas$Canvas$renderShapeDrawOp = F2(
	function (drawOp, cmds) {
		switch (drawOp.$) {
			case 0:
				return A2(
					$linsyking$elm_canvas$Canvas$renderShapeStroke,
					$elm$core$Maybe$Nothing,
					A2($linsyking$elm_canvas$Canvas$renderShapeFill, $elm$core$Maybe$Nothing, cmds));
			case 1:
				var c = drawOp.a;
				return A2(
					$linsyking$elm_canvas$Canvas$renderShapeFill,
					$elm$core$Maybe$Just(c),
					cmds);
			case 2:
				var c = drawOp.a;
				return A2(
					$linsyking$elm_canvas$Canvas$renderShapeStroke,
					$elm$core$Maybe$Just(c),
					cmds);
			default:
				var fc = drawOp.a;
				var sc = drawOp.b;
				return A2(
					$linsyking$elm_canvas$Canvas$renderShapeStroke,
					$elm$core$Maybe$Just(sc),
					A2(
						$linsyking$elm_canvas$Canvas$renderShapeFill,
						$elm$core$Maybe$Just(fc),
						cmds));
		}
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillText = F4(
	function (text, x, y, maybeMaxWidth) {
		if (maybeMaxWidth.$ === 1) {
			return A2(
				$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
				'fillText',
				_List_fromArray(
					[
						$elm$json$Json$Encode$string(text),
						$elm$json$Json$Encode$float(x),
						$elm$json$Json$Encode$float(y)
					]));
		} else {
			var maxWidth = maybeMaxWidth.a;
			return A2(
				$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
				'fillText',
				_List_fromArray(
					[
						$elm$json$Json$Encode$string(text),
						$elm$json$Json$Encode$float(x),
						$elm$json$Json$Encode$float(y),
						$elm$json$Json$Encode$float(maxWidth)
					]));
		}
	});
var $linsyking$elm_canvas$Canvas$renderTextFill = F5(
	function (txt, x, y, maybeStyle, cmds) {
		return A2(
			$elm$core$List$cons,
			A4($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillText, txt.aJ, x, y, txt.aB),
			function () {
				if (!maybeStyle.$) {
					var style = maybeStyle.a;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillStyleEx(style),
						cmds);
				} else {
					return cmds;
				}
			}());
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeText = F4(
	function (text, x, y, maybeMaxWidth) {
		if (maybeMaxWidth.$ === 1) {
			return A2(
				$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
				'strokeText',
				_List_fromArray(
					[
						$elm$json$Json$Encode$string(text),
						$elm$json$Json$Encode$float(x),
						$elm$json$Json$Encode$float(y)
					]));
		} else {
			var maxWidth = maybeMaxWidth.a;
			return A2(
				$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
				'strokeText',
				_List_fromArray(
					[
						$elm$json$Json$Encode$string(text),
						$elm$json$Json$Encode$float(x),
						$elm$json$Json$Encode$float(y),
						$elm$json$Json$Encode$float(maxWidth)
					]));
		}
	});
var $linsyking$elm_canvas$Canvas$renderTextStroke = F5(
	function (txt, x, y, maybeStyle, cmds) {
		return A2(
			$elm$core$List$cons,
			A4($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeText, txt.aJ, x, y, txt.aB),
			function () {
				if (!maybeStyle.$) {
					var style = maybeStyle.a;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeStyleEx(style),
						cmds);
				} else {
					return cmds;
				}
			}());
	});
var $linsyking$elm_canvas$Canvas$renderTextDrawOp = F3(
	function (drawOp, txt, cmds) {
		var _v0 = txt.bX;
		var x = _v0.a;
		var y = _v0.b;
		switch (drawOp.$) {
			case 0:
				return A5(
					$linsyking$elm_canvas$Canvas$renderTextStroke,
					txt,
					x,
					y,
					$elm$core$Maybe$Nothing,
					A5($linsyking$elm_canvas$Canvas$renderTextFill, txt, x, y, $elm$core$Maybe$Nothing, cmds));
			case 1:
				var fill = drawOp.a;
				return A5(
					$linsyking$elm_canvas$Canvas$renderTextFill,
					txt,
					x,
					y,
					$elm$core$Maybe$Just(fill),
					cmds);
			case 2:
				var stroke = drawOp.a;
				return A5(
					$linsyking$elm_canvas$Canvas$renderTextStroke,
					txt,
					x,
					y,
					$elm$core$Maybe$Just(stroke),
					cmds);
			default:
				var fill = drawOp.a;
				var stroke = drawOp.b;
				return A5(
					$linsyking$elm_canvas$Canvas$renderTextStroke,
					txt,
					x,
					y,
					$elm$core$Maybe$Just(stroke),
					A5(
						$linsyking$elm_canvas$Canvas$renderTextFill,
						txt,
						x,
						y,
						$elm$core$Maybe$Just(fill),
						cmds));
		}
	});
var $linsyking$elm_canvas$Canvas$renderText = F3(
	function (drawOp, txt, cmds) {
		return A3($linsyking$elm_canvas$Canvas$renderTextDrawOp, drawOp, txt, cmds);
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$drawImage = F9(
	function (sx, sy, sw, sh, dx, dy, dw, dh, imageObj) {
		return A2(
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn,
			'drawImage',
			_List_fromArray(
				[
					imageObj,
					$elm$json$Json$Encode$float(sx),
					$elm$json$Json$Encode$float(sy),
					$elm$json$Json$Encode$float(sw),
					$elm$json$Json$Encode$float(sh),
					$elm$json$Json$Encode$float(dx),
					$elm$json$Json$Encode$float(dy),
					$elm$json$Json$Encode$float(dw),
					$elm$json$Json$Encode$float(dh)
				]));
	});
var $linsyking$elm_canvas$Canvas$Internal$Texture$drawTexture = F4(
	function (x, y, t, cmds) {
		return A2(
			$elm$core$List$cons,
			function () {
				if (!t.$) {
					var image = t.a;
					return A9($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$drawImage, 0, 0, image.cC, image.bl, x, y, image.cC, image.bl, image.ar);
				} else {
					var sprite = t.a;
					var image = t.b;
					return A9($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$drawImage, sprite.d8, sprite.d9, sprite.cC, sprite.bl, x, y, sprite.cC, sprite.bl, image.ar);
				}
			}(),
			cmds);
	});
var $linsyking$elm_canvas$Canvas$renderTexture = F3(
	function (_v0, t, cmds) {
		var x = _v0.a;
		var y = _v0.b;
		return A4($linsyking$elm_canvas$Canvas$Internal$Texture$drawTexture, x, y, t, cmds);
	});
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$restore = A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn, 'restore', _List_Nil);
var $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$save = A2($linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fn, 'save', _List_Nil);
var $linsyking$elm_canvas$Canvas$renderDrawable = F3(
	function (drawable, drawOp, cmds) {
		switch (drawable.$) {
			case 0:
				var txt = drawable.a;
				return A3($linsyking$elm_canvas$Canvas$renderText, drawOp, txt, cmds);
			case 1:
				var ss = drawable.a;
				return A2(
					$linsyking$elm_canvas$Canvas$renderShapeDrawOp,
					drawOp,
					A3(
						$elm$core$List$foldl,
						$linsyking$elm_canvas$Canvas$renderShape,
						A2($elm$core$List$cons, $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$beginPath, cmds),
						ss));
			case 2:
				var p = drawable.a;
				var t = drawable.b;
				return A3($linsyking$elm_canvas$Canvas$renderTexture, p, t, cmds);
			case 3:
				var p = drawable.a;
				var w = drawable.b;
				var h = drawable.c;
				return A4($linsyking$elm_canvas$Canvas$renderClear, p, w, h, cmds);
			case 4:
				var renderables = drawable.a;
				return A3($linsyking$elm_canvas$Canvas$renderGroup, drawOp, renderables, cmds);
			default:
				return cmds;
		}
	});
var $linsyking$elm_canvas$Canvas$renderGroup = F3(
	function (drawOp, renderables, cmds) {
		var cmdsWithDraw = function () {
			switch (drawOp.$) {
				case 0:
					return cmds;
				case 1:
					var fill = drawOp.a;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillStyleEx(fill),
						cmds);
				case 2:
					var stroke = drawOp.a;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeStyleEx(stroke),
						cmds);
				default:
					var fc = drawOp.a;
					var sc = drawOp.b;
					return A2(
						$elm$core$List$cons,
						$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$fillStyleEx(fc),
						A2(
							$elm$core$List$cons,
							$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$strokeStyleEx(sc),
							cmds));
			}
		}();
		return A3(
			$elm$core$List$foldl,
			$linsyking$elm_canvas$Canvas$renderOne(drawOp),
			cmdsWithDraw,
			renderables);
	});
var $linsyking$elm_canvas$Canvas$renderOne = F3(
	function (parentDrawOp, _v0, cmds) {
		var commands = _v0.l;
		var drawable = _v0.r;
		var drawOp = _v0.q;
		return A2(
			$elm$core$List$cons,
			$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$restore,
			A3(
				$linsyking$elm_canvas$Canvas$renderDrawable,
				drawable,
				A2($linsyking$elm_canvas$Canvas$mergeDrawOp, parentDrawOp, drawOp),
				_Utils_ap(
					commands,
					A2($elm$core$List$cons, $linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$save, cmds))));
	});
var $linsyking$elm_canvas$Canvas$render = function (entities) {
	return A3(
		$elm$core$List$foldl,
		$linsyking$elm_canvas$Canvas$renderOne($linsyking$elm_canvas$Canvas$Internal$Canvas$NotSpecified),
		$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$empty,
		entities);
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $linsyking$elm_canvas$Canvas$Internal$Texture$TImage = function (a) {
	return {$: 0, a: a};
};
var $linsyking$elm_canvas$Canvas$Internal$Texture$decodeTextureImage = A2(
	$elm$json$Json$Decode$andThen,
	function (image) {
		return A4(
			$elm$json$Json$Decode$map3,
			F3(
				function (tagName, width, height) {
					return (tagName === 'IMG') ? $elm$core$Maybe$Just(
						$linsyking$elm_canvas$Canvas$Internal$Texture$TImage(
							{bl: height, ar: image, cC: width})) : $elm$core$Maybe$Nothing;
				}),
			A2($elm$json$Json$Decode$field, 'tagName', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$float));
	},
	$elm$json$Json$Decode$value);
var $linsyking$elm_canvas$Canvas$Internal$Texture$decodeImageLoadEvent = A2($elm$json$Json$Decode$field, 'target', $linsyking$elm_canvas$Canvas$Internal$Texture$decodeTextureImage);
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $linsyking$elm_canvas$Canvas$renderTextureSource = function (textureSource) {
	var url = textureSource.a;
	var onLoad = textureSource.b;
	return _Utils_Tuple2(
		url,
		A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src(url),
					A2($elm$html$Html$Attributes$attribute, 'crossorigin', 'anonymous'),
					A2($elm$html$Html$Attributes$style, 'display', 'none'),
					A2(
					$elm$html$Html$Events$on,
					'load',
					A2($elm$json$Json$Decode$map, onLoad, $linsyking$elm_canvas$Canvas$Internal$Texture$decodeImageLoadEvent)),
					A2(
					$elm$html$Html$Events$on,
					'error',
					$elm$json$Json$Decode$succeed(
						onLoad($elm$core$Maybe$Nothing)))
				]),
			_List_Nil));
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $linsyking$elm_canvas$Canvas$toHtmlWith = F3(
	function (options, attrs, entities) {
		return A3(
			$elm$html$Html$Keyed$node,
			'elm-canvas',
			A2(
				$elm$core$List$cons,
				$linsyking$elm_canvas$Canvas$Internal$CustomElementJsonApi$commands(
					$linsyking$elm_canvas$Canvas$render(entities)),
				A2(
					$elm$core$List$cons,
					$elm$html$Html$Attributes$height(options.bl),
					A2(
						$elm$core$List$cons,
						$elm$html$Html$Attributes$width(options.cC),
						attrs))),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('__canvas', $linsyking$elm_canvas$Canvas$cnvs),
				A2($elm$core$List$map, $linsyking$elm_canvas$Canvas$renderTextureSource, options.dS)));
	});
var $author$project$Main$view = F2(
	function (_v0, model) {
		var transitiondata = A2($elm$core$Maybe$map, $elm$core$Tuple$first, model.dZ);
		var canvas = A3(
			$linsyking$elm_canvas$Canvas$toHtmlWith,
			{
				bl: $elm$core$Basics$floor(model.P.dc.dx),
				dS: $author$project$Lib$Resources$Base$getTexture,
				cC: $elm$core$Basics$floor(model.P.dc.dA)
			},
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$elm$core$String$fromFloat(model.P.dc.dK)),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$core$String$fromFloat(model.P.dc.dM)),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed')
				]),
			_List_fromArray(
				[
					$author$project$MainConfig$background(model.P),
					A3(
					$author$project$Lib$Scene$Transition$makeTransition,
					model.P,
					transitiondata,
					A2(
						$author$project$Lib$Scene$Loader$getCurrentScene(model).d2,
						{S: model.P, w: $author$project$Base$NullMsg, Y: model.dU},
						model.cS))
				]));
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			function () {
				var _v1 = model.P.c1;
				if (!_v1.$) {
					var x = _v1.a;
					return _List_fromArray(
						[canvas, x]);
				} else {
					return _List_fromArray(
						[canvas]);
				}
			}());
	});
var $author$project$Main$main = $MartinSStewart$elm_audio$Audio$elementWithAudio(
	{
		cK: $author$project$Common$audio,
		cL: {c4: $author$project$Lib$Audio$Audio$audioPortFromJS, dX: $author$project$Lib$Audio$Audio$audioPortToJS},
		db: $author$project$Main$init,
		dP: $author$project$Main$subscriptions,
		d$: $author$project$Main$update,
		d2: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (windowWidth) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (windowHeight) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (timeStamp) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (info) {
									return $elm$json$Json$Decode$succeed(
										{da: info, dV: timeStamp, d5: windowHeight, d6: windowWidth});
								},
								A2($elm$json$Json$Decode$field, 'info', $elm$json$Json$Decode$string));
						},
						A2($elm$json$Json$Decode$field, 'timeStamp', $elm$json$Json$Decode$int));
				},
				A2($elm$json$Json$Decode$field, 'windowHeight', $elm$json$Json$Decode$float));
		},
		A2($elm$json$Json$Decode$field, 'windowWidth', $elm$json$Json$Decode$float)))(0)}});}(this));
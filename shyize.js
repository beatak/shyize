/**
 * insert &shy; (or equivalent) to the target element smartly, so
 * browser will handle the word wrap more naturally.
 * one note: the applied elements must NOT have child elements.
 * it must only contain text node.
 * 
 * example:
 * 
 * <div class="mylongword">supercalifragilisticexpialidocious</div>
 * <script>
 * $('.mylongword').shyize({limit: 10});
 * </script>
 * 
 * // => <div class="mylongword">supercalif&shy;ragilistic&shy;expialidoci&shy;ous</div>
 */

(function ($) {

var shyize = function (str, limit) {
	var arr = str.split(' ');
	for (var i = 0, len = arr.length; i < len; ++i) {
		if (arr[i].length > limit) {
			arr[i] = insertShy(arr[i], limit);
		}
	}
	return arr.join(' ');
};

var insertShy = function (str, limit) {
	var arr = [];
	do {
		arr[arr.length] = str.slice(0, limit);
		str = str.slice(limit);
	}
	while (str.length > limit)
	arr[arr.length] = str;
	// if IE9 works in IE8 mode,
	// &shy; doesn't seem to be working.
	// it's most definitely a IE bug, but anyway
	if ($.browser.msie && document.documentMode >= 8) {
		return arr.join('&#8203;');
	}
	else {
		return arr.join('&shy;');
	}
};

/**
 * jquery plugin: shyize
 * @param opt {Object} `limit` attribute is required.
 */
$.fn.shyize = function (opt) {
	if (this.length === 0) {
		LOG.info('wrong selector');
		return;
	}
	if (!opt) {
		LOG.info('need to pass {limit: xx} as option.');
		return;
	}
	var limit = parseInt(opt.limit, 10);
	if (!limit) {
		LOG.info('wrong limit');
		return;
	}
	this.each(
		function (n, elm) {
			var str, $elm = $(elm);
			if ($elm.find('*').length > 0) {
				LOG.info('$.fn.shyize: you cannot run shyize to the elemnts contains other elements.');
				return;
			}
			str = shyize($elm.html(), limit);
			str = str.replace('<', '&lt;', 'g').replace('>', '&gt;', 'g');
			$elm.html(str);
		}
	);
};

})(jQuery);
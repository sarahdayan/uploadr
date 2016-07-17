/* Uploadr v1.0.0 by Sarah Dayan | http://demos.sarahdayan.com/uploadr */
(function ($) {

	$.fn.uploadr = function(options) {

		var settings = $.extend({
			layout: 'default',
			displayPreview: true,
			deleteButton: true,
			loadButtonText: 'Load a file',
			changeButtonText: 'Change',
			deleteButtonText: 'Delete'
		}, options);

		var uploadr = this;

		uploadr
			.wrap('<div class="uploadr uploadr-new ' + settings.layout + '"></div>')
			.wrap('<div class="uploadr-buttons">')
			.parents('.uploadr-buttons')
			.before('<div class="uploadr-exists uploadr-preview"></div>')
			.after('<div class="uploadr-exists uploadr-button uploadr-delete">' + settings.deleteButtonText + '</div>')
			.end()
			.before('<div class="uploadr-new uploadr-button uploadr-load">' + settings.loadButtonText + '</div>')
			.before('<div class="uploadr-exists uploadr-button uploadr-change">' + settings.changeButtonText + '</div>');

		var wrapper = uploadr.parents('.uploadr');
		var loadButton = wrapper.find('.uploadr-load');
		var changeButton = wrapper.find('.uploadr-change');
		var deleteButton = wrapper.find('.uploadr-delete');
		var preview = wrapper.find('.uploadr-preview');
		var imagesFormat = ['image/jpeg', 'image/png', 'image/gif'];

		deleteFile(uploadr, wrapper);

		if (!settings.deleteButton) {
			deleteButton.hide();
		}

		uploadr.on('change', function() {
			if (uploadr[0].value) {
				wrapper.removeClass('uploadr-new').addClass('uploadr-exists');
				if (settings.displayPreview) {
					if (window.FileReader) {
						var file = uploadr[0].files[0];
						if (imagesFormat.indexOf(file.type) != -1) {
							preview.html('<img src="" alt="">');
							var reader = new FileReader();
							reader.addEventListener('load', function() {
								preview.find('img')[0].src = reader.result;
							}, false);
							if (file) {
								reader.readAsDataURL(file);
							}
						}
						else {
							displayFileName(preview, file.name);
						}
					}
					else {
						var file = uploadr[0].value.match(/[^\/\\]+$/);
						displayFileName(preview, file);
					}
				}
			}
			else {
				wrapper.addClass('uploadr-new').removeClass('uploadr-exists');
			}
		});

		deleteButton.on('click', function() {
			deleteFile(uploadr, wrapper);
		});

		function displayFileName(preview, filename) {
			preview.html(filename);
		}

		function deleteFile(uploadr, wrapper) {
			uploadr[0].value = null;
			wrapper.addClass('uploadr-new').removeClass('uploadr-exists');
		}

	};

}(jQuery));

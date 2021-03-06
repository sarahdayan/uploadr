/* Uploadr v1.1.0 by Sarah Dayan | https://sarahdayan.github.io/uploadr */
(function ($) {

	$.fn.uploadr = function(options) {

		var settings = $.extend({
			layout: 'default',
			displayPreview: true,
			deleteButton: true,
			loadButtonText: 'Load a file',
			changeButtonText: 'Change',
			deleteButtonText: 'Delete',
			addFileEvent: function() {},
			changeFileEvent: function() {},
			deleteFileEvent: function() {}
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
		var deleteButton = wrapper.find('.uploadr-delete');
		var preview = wrapper.find('.uploadr-preview');
		var imagesFormat = ['image/jpeg', 'image/png', 'image/gif'];
		var storedValue = '';
		var isNew = true;
		var file = '';

		deleteFile(uploadr, wrapper, false);

		if (!settings.deleteButton) {
			deleteButton.hide();
		}

		uploadr.on('change', function() {
			if (uploadr[0].value) {
				isNew = storedValue !== '' ? false : true;
				storedValue = uploadr[0].value;
				wrapper.removeClass('uploadr-new').addClass('uploadr-exists');
				if (settings.displayPreview) {
					if (window.FileReader) {
						file = uploadr[0].files[0];
						if (imagesFormat.indexOf(file.type) != -1) {
							displayFilePreview(preview, file, isNew);
						}
						else {
							displayFileName(preview, file.name, isNew);
						}
					}
					else {
						file = uploadr[0].value.match(/[^\/\\]+$/);
						displayFileName(preview, file, isNew);
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

		function displayFileName(preview, filename, isNew) {
			preview.html(filename);
			addOrChangeEvent(isNew);
		}

		function displayFilePreview(preview, file, isNew) {
			preview.html('<img src="" alt="">');
			var reader = new FileReader();
			reader.addEventListener('load', function() {
				preview.find('img')[0].src = reader.result;
			}, false);
			if (file) {
				reader.readAsDataURL(file);
			}
			addOrChangeEvent(isNew);
		}

		function deleteFile(uploadr, wrapper, event) {
			event = typeof(event) === 'undefined' ? true : event;
			uploadr[0].value = null;
			wrapper.addClass('uploadr-new').removeClass('uploadr-exists');
			storedValue = '';
			if (event) {
				uploadr.trigger('deleteFile');
			}
		}

		function addOrChangeEvent(isNew) {
			if (isNew) {
				uploadr.trigger('addFile');
			}
			else {
				uploadr.trigger('changeFile');
			}
		}

		uploadr.on('addFile', function() {
			settings.addFileEvent();
		});

		uploadr.on('changeFile', function() {
			settings.changeFileEvent();
		});

		uploadr.on('deleteFile', function() {
			settings.deleteFileEvent();
		});

	};

}(jQuery));

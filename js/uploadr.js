/* Uploadr v1.1.0 by Sarah Dayan | http://demos.sarahdayan.com/uploadr */
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
		var loadButton = wrapper.find('.uploadr-load');
		var changeButton = wrapper.find('.uploadr-change');
		var deleteButton = wrapper.find('.uploadr-delete');
		var preview = wrapper.find('.uploadr-preview');
		var imagesFormat = ['image/jpeg', 'image/png', 'image/gif'];
		var storedValue = '';
		var isNew = true;

		deleteFile(uploadr, wrapper, false);

		if (!settings.deleteButton) {
			deleteButton.hide();
		}

		uploadr.on('change', function() {
			if (uploadr[0].value) {
				isNew = storedValue != '' ? false : true;
				storedValue = uploadr[0].value;
				wrapper.removeClass('uploadr-new').addClass('uploadr-exists');
				if (settings.displayPreview) {
					if (window.FileReader) {
						var file = uploadr[0].files[0];
						if (imagesFormat.indexOf(file.type) != -1) {
							displayFilePreview(preview, file, isNew);
						}
						else {
							displayFileName(preview, file.name, isNew);
						}
					}
					else {
						var file = uploadr[0].value.match(/[^\/\\]+$/);
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
			addOrDeleteEvent(isNew);
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
			addOrDeleteEvent(isNew);
		}

		function deleteFile(uploadr, wrapper, callback) {
			var callback = typeof(callback) === 'undefined' ? true : callback;
			uploadr[0].value = null;
			wrapper.addClass('uploadr-new').removeClass('uploadr-exists');
			storedValue = '';
			if (callback) {
				deleteFileEvent();
			}
		}

		function addOrDeleteEvent(isNew) {
			if (isNew) {
				addFileEvent();
			}
			else {
				changeFileEvent();
			}
		}

		function addFileEvent() {
			settings.addFileEvent();
		}

		function changeFileEvent() {
			settings.changeFileEvent();
		}

		function deleteFileEvent() {
			settings.deleteFileEvent();
		}

	};

}(jQuery));

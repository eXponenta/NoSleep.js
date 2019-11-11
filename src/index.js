import MEDIA from "./media";

// Detect iOS browsers < version 10
const oldIOS =
	typeof navigator !== "undefined" &&
	parseFloat(
		(
			"" +
			(/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(
				navigator.userAgent
			) || [0, ""])[1]
		)
			.replace("undefined", "3_2")
			.replace("_", ".")
			.replace("_", "")
	) < 10 && !window.MSStream;

export class NoSleep {
	get isEnabled() {
		return this.enabled;
	}

	constructor(title = "No Sleep") {
		this.enabled = false;
		if (oldIOS) {
			this.noSleepTimer = null;
		} else {
			// Set up no sleep video element
			this.noSleepVideo = document.createElement("video");

			this.noSleepVideo.setAttribute("title", title);
			this.noSleepVideo.setAttribute("muted", "");
			this.noSleepVideo.setAttribute("playsinline", "");

			this._addSourceToVideo(this.noSleepVideo, "webm", MEDIA.webm);
			this._addSourceToVideo(this.noSleepVideo, "mp4", MEDIA.mp4);

			this.noSleepVideo.addEventListener("loadedmetadata", () => {
				if (this.noSleepVideo.duration <= 1) {
					// webm source
					this.noSleepVideo.setAttribute("loop", "");
				} else {
					// mp4 source
					this.noSleepVideo.addEventListener("timeupdate", () => {
						if (this.noSleepVideo.currentTime > 0.5) {
							this.noSleepVideo.currentTime = Math.random();
						}
						if (this.noSleepVideo.paused && this.enabled) {
							this.noSleepVideo.play();
						}
					});
				}
			});
		}
	}

	_addSourceToVideo(element, type, dataURI) {
		var source = document.createElement("source");
		source.src = dataURI;
		source.type = `video/${type}`;
		element.appendChild(source);
	}

	enable() {
		if (oldIOS) {

			this.disable();

			console.warn(`
				NoSleep enabled for older iOS devices. This can interrupt
				active or long-running network requests from completing successfully.
				See https://github.com/richtr/NoSleep.js/issues/15 for more details.
			`);
			this.noSleepTimer = window.setInterval(() => {
				if (!document.hidden) {
					window.location.href = window.location.href.split("#")[0];
					window.setTimeout(window.stop, 0);
				}
			}, 15000);

			this.enabled = true;

		} else {
			const playPromise = this.noSleepVideo.play();

			if (playPromise) {
				return playPromise.then(_ => { this.enabled = true; });
			}
		}
	}

	disable() {
		this.enabled = false;

		if (oldIOS) {
			if (this.noSleepTimer) {
				console.warn(`NoSleep now disabled for older iOS devices.`);
				window.clearInterval(this.noSleepTimer);
				this.noSleepTimer = null;
			}
		} else {
			this.noSleepVideo.pause();
		}
	}
}


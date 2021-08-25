let app;

function loadVue() {
	Notifier.load();
	Modal.load();
	Vue.config.devtools = true;

	Vue.component('top-text', {
		data: () => { return {
			Research,
			player,
			format,
			formatWhole,
			Decimal,
			Modal
		}},
		template: `<div style="position: relative">
			<div style="position: absolute;">
				<span style="font-size: 20px">
					{{format(player.currency.shards)}} <span class="curr shards">_</span>
				</span>
				<br>
				Welcome to Cassiopeia. Press WASD to navigate around the planet<span v-if="Research.has('access', 1)">,
				and E to open the building menu</span>.
			</div>
			<div style="position: absolute; right: 0">
				<button onclick="Modal.show({
					title: 'Options',
					bind: 'options-menu'
				})">Options</button>
				<button onclick="paused = true;
				Modal.show({
					title: 'Paused',
					text: \`<br><br>Paused\`,
					close() {
						paused = false;
						Modal.close();
					},
					buttons: [{text: 'Unpause', onClick() {Modal.closeFunc()}}]
				})">Pause</button>
				<button onclick="Modal.show({
					title: 'Credits',
					text: \`<br><br><br>
					Game and Graphics: Dystopia181<br><br>
					Inspired by: <b>Cleansed</b> by Yhvr (<a href='https://yhvr.itch.io/cleansed' target='newtab'>Link</a>)\`,
					buttons: [{text: 'Close', onClick() {Modal.close()}}]
				})">Credits</button>
			</div>
		</div>`
	});
	Vue.component('attributes', {
		data: () => { return {
			SPECIAL_CHARS,
			attrs: player.attributes
		}},
		methods: {
			format
		},
		template: `<div id="attr-container">
			<span class="attr health">{{SPECIAL_CHARS.health}}</span>
			<div class="bar-background">
				<div :style="{
					width: attrs.health.min(100)*2 + 'px'
				}" class="bar-foreground healthbg"></div>
			</div>
			<br>
			<span class="attr meat">{{SPECIAL_CHARS.meat}}</span>
			<div class="bar-background">
				<div :style="{
					width: attrs.food.min(100)*2 + 'px'
				}" class="bar-foreground meatbg"></div>
			</div>
			<br><br>
			<span class="attr power"></span>
			<span style="font-size: 30px;" class="mid">{{format(attrs.powerUsed, 0)}}/{{format(attrs.power, 0)}}</span>
		</div>`
	})
	Vue.component('options-menu', {
		data: () => { return {
			player
		}},
		template: `<div style="text-align: center">
			<span style="font-size: 18px">Saving:</span>
			<br>
			<button class="option" onclick="player.options.autosave = !player.options.autosave;">Autosave: {{player.options.autosave ? "ON" : "OFF"}} (20s)</button>
			<button class="option" onclick="save()">Manual Save</button>
			<button class="option" onclick="if (confirm('Are you sure you want to reset?')) reset()">HARD RESET</button>
			<br>
			<span style="font-size: 18px">Visuals:</span>
			<br>
			<button class="option" onclick="player.options.showTilePopups = !player.options.showTilePopups; renderLayer2();">Show "Use" tooltips: {{player.options.showTilePopups ? "ON" : "OFF"}}</button>
			<button class="option" onclick="player.options.showTileU = !player.options.showTileU; renderLayer2();">Show unexplored tile tooltips: {{player.options.showTileU ? "ON" : "OFF"}}</button>
		</div>`
	});

	loadMenus();
	
	app = new Vue({
		el: "#app",
		data: {
			player,
			format,
			formatWhole,
			Decimal,
			notifiers,
			Notifier,
			Modal,
			SPECIAL_CHARS
		},
		methods: {
			D
		}
	})
}
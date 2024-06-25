<style>
    /* (A) FORCE ALL ITEMS INTO SINGLE ROW */
    .hmove { display: flex; }
    .hitem { width: 100%; flex-shrink: 0; }
    .hwrap { overflow: hidden; }

    /* (B) MOVE ITEMS FROM RIGHT TO LEFT */
    /* first item = 0, fourth item = -300% */
    @keyframes tickerh {
        0% { transform: translatex(100%); }
        100% { transform: translatex(-400%); }
    }
    .hmove { animation: tickerh linear 20s infinite; }
    .hmove:hover { animation-play-state: paused; }
</style>


<div class="hwrap">
	<div class="hmove">
		<div class="hitem">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
		<div class="hitem">Aliquam consequat varius consequat.</div>
		<div class="hitem">Fusce dapibus turpis vel nisi malesuada sollicitudin.</div>
		<div class="hitem">Pellentesque auctor molestie orci ut blandit.</div>
	</div>
</div>
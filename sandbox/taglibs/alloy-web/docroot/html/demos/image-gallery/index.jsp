<%@ include file="/html/demos/init.jsp" %>

<style type="text/css">
.gallery {
	margin: 30px;
}

.gallery .picture {
	border: 5px solid #222;
	margin: 3px;
}

.gallery a {
	outline: none;
}
</style>

<h1>Alloy - ImageGallery</h1>

<h1 id="log">Loading...</h1>

<div id="gallery1" class="gallery">
	<a href="/html/demos/image-gallery/assets/lfr-soccer-1.jpg" title="Doug, Meesa and Louis resting">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-1_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-2.jpg" title="Grand finale teams">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-2_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-3.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-3_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-4.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-4_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-5.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-5_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-6.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-6_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-7.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-7_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-1.jpg" title="Doug, Meesa and Louis resting">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-1_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-2.jpg" title="Grand finale teams">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-2_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-3.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-3_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-4.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-4_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-5.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-5_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-6.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-6_tn.jpg" />
	</a>
	<a href="/html/demos/image-gallery/assets/lfr-soccer-7.jpg" title="Jen looking the landscape">
		<img class="picture" src="/html/demos/image-gallery/assets/lfr-soccer-7_tn.jpg" />
	</a>
</div>

<div style="height: 1000px;"></div>

<alloy:image-gallery
	caption="Liferay Champion Soccer"
	delay="2000"
	links="#gallery1 a"
	maxHeight="400"
	maxWidth="400"
/>

<script type="text/javascript">

AUI().ready('aui-image-viewer-gallery', function(A) {

	A.one('#log').html('Ready, click on the images.');
	
});

</script>
import { AppShell, FormNotice, PageHero } from "../../components";

export default function ClipUploadPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Upload clip" title="Share a play with your clan and followers." copy="Clip storage, thumbnails, moderation and adaptive video streaming connect in the media backend phase." />
      <form className="product-form">
        <FormNotice>Upload is disabled until direct-to-storage video handling is connected.</FormNotice>
        <div className="dropzone"><strong>Drop video file here</strong><small>MP4, MOV, WebM. Duration limits depend on plan.</small></div>
        <label>Title<input className="field" placeholder="Insane 1v4 Clutch" /></label>
        <label>Game<select className="field"><option>CODM</option><option>PUBG Mobile</option><option>Free Fire</option></select></label>
        <label>Description<textarea className="field" placeholder="Add context, tagged players and hashtags." /></label>
        <button className="btn primary" disabled>Upload when storage is connected</button>
      </form>
    </AppShell>
  );
}

import { useEffect } from 'react';
import './kavio.css';

export default function KavioDeleteAccountPage() {
  useEffect(() => {
    document.title = 'Delete your Kavio account | XNR IT Solutions';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Request deletion of your Kavio account and associated data from XNR IT Solutions, with or without access to the app.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://xnritsolutions.com/kavio/delete-account');
  }, []);
  return <div className="kavio-page"><header className="kavio-nav"><a className="kavio-nav-brand" href="/kavio"><img src="/assets/kavio/logo.png" alt="" /><span>Kavio<small>by XNR IT Solutions</small></span></a><a href="/kavio">Back to Kavio ↗</a></header>
    <main className="kavio-privacy kavio-deletion">
      <p className="section-label">ACCOUNT & DATA</p><h1>Delete your Kavio account</h1><p>You can request deletion of your Kavio account and associated personal data from XNR IT Solutions without installing or signing in to the app.</p>
      <section className="kavio-deletion-request"><h2>Request deletion by email</h2><ol><li>Send an email to <a href="mailto:technology@xnritsolutions.com">technology@xnritsolutions.com</a>, preferably from the email address registered to your Kavio account.</li><li>Use the subject <strong>Kavio account deletion</strong> and include your registered account email.</li><li>We verify ownership before deleting account data. If you cannot access the registered email, explain that in your request so we can discuss verification.</li></ol><p>Do not send your password, verification codes, or customer and financial records.</p></section>
      <section><h2>Delete directly in the app</h2><ol><li>Open <strong>More → Account & devices → Delete account</strong>.</li><li>Enter your current password and confirm permanent deletion.</li></ol><p>An internet connection is required. Save any records you need before deleting your account.</p></section>
      <section><h2>What is deleted</h2><p>Account deletion removes your server account, including the account profile, and revokes its sign-in sessions. Deleting through the app also removes that account’s local Kavio workspace on the phone where you perform the deletion.</p><p>The current release keeps business records on your device rather than syncing them to your account. An email request cannot remotely erase local records on your devices. Remove those copies by clearing Kavio’s app storage or uninstalling the app on each device. Separately delete any exported backups or files you shared or saved elsewhere.</p></section>
      <section><h2>Information that may remain</h2><p>Restricted backup copies may remain until they expire or are overwritten. Logs, records needed for security, and information subject to legal obligations may be retained only as needed for those purposes. We will explain any applicable retention when handling your request. See the <a href="/kavio/privacy#retention">privacy policy’s retention section</a>.</p></section>
      <section><h2>Before you request deletion</h2><p>Deletion is permanent. Signing out or uninstalling the app alone does not delete your server account. If you only need help accessing Kavio, contact the same support address and describe your issue instead.</p><p><a href="/kavio/privacy">Read the Kavio Privacy Policy</a></p></section>
    </main></div>;
}

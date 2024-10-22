package com.maildash

import android.util.Log
import com.facebook.react.bridge.*
import com.sun.mail.imap.IMAPStore
import javax.mail.Session
import javax.mail.Folder
import java.util.Properties
import javax.mail.AuthenticationFailedException

class ImapModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val oauth2Authenticator = OAuth2Authenticator()

    override fun getName(): String {
        return "ImapModule"
    }

    @ReactMethod
    fun getEmails(imapHost: String, email: String, token: String, promise: Promise) {
        println("ImapModule Reached")
        val props = Properties().apply {
            put("mail.imap.ssl.enable", "true")
        }
        val session = Session.getInstance(props)
        try {
            val store: IMAPStore = oauth2Authenticator.connectToImap(session, email, token) as IMAPStore
           println("Going to get emails.....")
            val emails = fetchEmailsFromStore(store)
            promise.resolve(emails)
        } catch (e: AuthenticationFailedException) {
            println("Authentication failed: ${e.message}")
            promise.reject("AUTH_FAILED", e.message, e)
        } catch (e: Exception) {
            println("Error fetching emails: ${e.message}")
            promise.reject("ERROR_FETCHING_EMAILS", e.message, e)
        }
    }

   private fun fetchEmailsFromStore(store: IMAPStore): Int {
    var totalMailCount = 0
    try {
        val inbox = store.getFolder("INBOX")        
        inbox.open(Folder.READ_ONLY) 
        totalMailCount = inbox.messageCount
        inbox.close(false)
    } catch (e: Exception) {
       println("Error fetching emails: ${e.message}")
    }

    return totalMailCount
}


}

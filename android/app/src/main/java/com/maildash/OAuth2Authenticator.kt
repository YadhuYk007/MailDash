package com.maildash

import com.sun.mail.imap.IMAPStore
import javax.mail.Session
import javax.mail.Store
import java.util.Properties
import javax.mail.AuthenticationFailedException

class OAuth2Authenticator {
    fun connectToImap(
        session: Session,
        userEmail: String,
        oauthToken: String,
    ): Store {
        val props = Properties().apply {
            put("mail.imap.ssl.enable", "true")
        }
        val store = session.getStore("imaps") as IMAPStore
        try {
            store.connect("imap.gmail.com", 993, userEmail, oauthToken)
        } catch (e: AuthenticationFailedException) {
            throw AuthenticationFailedException("Authentication failed: ${e.message}")
        }
        return store
    }
}

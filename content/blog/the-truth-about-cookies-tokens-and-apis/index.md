---
slug: the-truth-about-cookies-tokens-and-apis
date: 2020-11-19
title: "The truth about cookies, tokens and APIs - Phillipe de Ryck"
published: true
banner: './cookie.jpeg'
---

## Notes from [The truth about cookies, tokens and APIs - Phillipe de Ryck](https://www.youtube.com/watch?v=-zD11ubPsFM)

Old way:
- Send an auth request to the server -> get a **cookie** -> request a resource with that cookie (`Cookie: ID=123`)
- The session info is stored in a server side object

New way:
- Send an auth request to the server -> get a **token** -> request a resource with that token (`Authorization: Bearer token-123` header)
- Often use client-side session object (e.g. storing the token in `localStorage`)

Having a couple of clients and a small amount of backend servers works well with a stateful backend (using sticky sessions etc.)
If you have lots of (micro)services, you'd probably benefit from a stateless (REST) backend (that's where tokens come in)

Takeaway: **Don't overthink statelessness** - there are various degrees of statelessness, each with its own use cases. Build your API according to your requirements

It's not about cookies vs. tokens - after all you can put a token in a cookie and a session cookie in an auth header. Cookies are storage & HTTP transport mechanism, whereas headers are a transport mechanism and we need to choose tools accordingly.

**How OAuth works:**
- User wants to request a resource that requires auth
- Authorization server returns an authorization code to the client
- Client then uses that authorization code in order to request an authorization **token** - e.g. a JWT
  
This access token represents **authority** - whether user should be allowed to access a certain resource.

JWT is a self-contained token as it contains header, payload and signature in a Base64 encoded format. The JWT payload contains a set of claims regarding the resources that the user has access to. This token is enough for the resource server (e.g. a microservice) to authorize a user

OAuth also supports a mechanism called **"reference tokens"** which just a random string and has **no authority**. As such, the resource server (e.g. a microservice) has to confirm with the authorization server whether the user can access a given resource with that token.

Takeaway: **Differentiate the mechanism from the value** - Cookies or the Authorization header can be used to transport authorization state. Both can contain any type of String-based value

Cookies are handled by the browser and the browser gets to decide whether it should send cookies with a request (which works well if your backend is running on the same domain)

Sharing cookies across domains is not a feature that is supported in browsers.

Using an authorization header allows you to have more flexibility (you're not constrained by the same domain)

Takeaway: **Take your deployment secnario into account** - cookies only work well with a single backend domain. The Authorization header can be sent to multiple domains

A common place to store authorization token in `localStorage`. Local storage is stored in the browser and stores data for a particular domain (origin-based separation). If you open multiple browser windows with the same site, they will share the local storage.

There's also session storage which has origin based separation as well but only a single browser window has access to this session storage data (it'll have access to its own session storage though).

If an attacker steals a token from local storage/session storage you're fucked - they can do basically everything with it.

**HTTP Only cookies** - cookies that cannot be read by JavaScript.

>HttpOnly is useful, but not as an XSS defense

Even though HttpOnly cookie is not visible to an attacker, through advanced techniques it is possible to steal the identity of the user.

![](assets/client-side-storage-mechanisms.png)

Takeaway: **Don't underestimate XSS** - contrary to custom storage areas, cookies can be fully hidden from JavaScript, preventing theft through XSS. XSS is the problem here, and HttpOnly **will not save you**.

Traditional, old school (secure?) cookie headers:

`Set-Cookie: name=value`

`Set-Cookie: name=value; Secure`

`Set-Cookie: name=value; Secure; HttpOnly`

`Set-Cookie: __Secure-name=value; Secure; HttpOnly`

`Set-Cookie: __Host-name=value; Secure; HttpOnly`

>Let's be honest, cookies are a mess

>All hail the Authorization: Bearer token header

Why? Because we can do whatever we want, no need for special cookie names, params (like `HttpOnly` etc.)

Make sure not to send an authorization token with **every** request as you probably don't want to share it with every 3rd party you use (this will probably be implemented using whitelist/blacklist)

Takeaway: **There's no free lunch** - Both mechanisms require effort to secure. Cookies need flags and prefixes, and the Authorization header needs to be controlled in code.

(This is somewhat obvious but important to emphasize - when using authorization headers they are not sent by default by the browser - e.g. when fetching images/scripts, as opposed to cookies).

Takeaway: **Cookies are always there** - cookies are present on **every browser-initiated request**, while the Authorization header is not. If you depend on authorization for these features (e.g. fetching images/scripts in HTML), consider using cookies.

Downside: if cookies are always there, we need to deal with CSRF (because an attacker will always get those cookies during a successful attack).

Takeaway: **Cookies are always there** - cookies are present on **every browser-initiated request**, even when it originates from an attacker's page. If you use cookies, implement CSRF protection.

SSO flow (e.g. OKTA) uses cookies to keep track of session for single-sign-on (even though authorization cookies are still used).

Takeaway: **Cookies are inerent to the Web (for now)* - cookies are inherent to the Web and are the only reliable way to propagate state. FOr now, secure your cookies and lookout for the future.

Every cookie sent over HTTPS **should be marked as Secure;** and yet - only 5% of them are.

There's a proposal to remove cookies altogether and replace them with [HTTP State Tokens](https://github.com/mikewest/http-state-tokens)

Last takeaways:

**Cookies are part of the Web, whether you like it or not**
- They work well with a single domain, for all types of requests
- They require flags and prefixes to lock'em down

**The Authorization header with Bearer tokens is flexible**
- They work well, even in multi-domain scenarios
- They require application code and are not always there

**Proposal o replace Cookies with HTTP State Tokens**
- Client generates the values
- Server offers additional security features (e.g. signing key)
---
title: "ReadMe.io migration tracker"
description: "Serial tracker for migrating readme.io docs into content/docs/v2.0 and content/docs/v1.0"
---

# ReadMe.io Migration Tracker
This document lists the ReadMe pages for Lenco API (v2 and v1) and records which pages have subpages. We'll use this tracker to migrate pages one-by-one into this repo under `content/docs/`.

---

## v2 (canonical) — https://lenco-api.readme.io/v2.0/reference/introduction

Top-level sections found on the v2 introduction page:

- Introduction — /v2.0/reference/introduction (landing)
- Getting Started — /v2.0/reference/get-started
- Accept Payments — /v2.0/reference/accept-payments (has subpages)
- Accounts — /v2.0/reference/get-accounts (has subpages)
- Banks — /v2.0/reference/get-banks (has subpages)
- Resolve Account — /v2.0/reference/resolve-bank-account (has subpages)
- Transfer Recipients — /v2.0/reference/get-transfer-recipients (has subpages)
- Transfers — /v2.0/reference/get-transfers (has subpages)
- Collections — /v2.0/reference/get-collections (has subpages)
- Settlements — /v2.0/reference/get-settlements (has subpages)
- Transactions — /v2.0/reference/get-transactions (has subpages)
- Webhooks — /v2.0/reference/webhooks
- Encryption — /v2.0/reference/encryption (has subpages)
- Point of Sale — /v2.0/reference/get-assigned-pos-terminals (has subpages)
- Pricing — /v2.0/reference/pricing

### v2: subpages (discovered so far)

- Accept Payments
	- /v2.0/reference/test-cards-and-accounts
	- Accept Payments uses the Collections endpoints for verification (collections/status)
- Accounts
	- /v2.0/reference/get-accounts
	- /v2.0/reference/get-account-by-id
	- /v2.0/reference/get-account-balance
- Banks
	- /v2.0/reference/get-banks
- Resolve Account
	- /v2.0/reference/resolve-bank-account
	- /v2.0/reference/resolve-mobile-money-account
	- /v2.0/reference/resolve-lenco-money-account
	- /v2.0/reference/resolve-lenco-merchant-account
- Transfer Recipients
	- /v2.0/reference/get-transfer-recipients
	- /v2.0/reference/get-transfer-recipient-by-id
	- /v2.0/reference/create-transfer-recipient-as-bank-account
	- /v2.0/reference/create-transfer-recipient-as-mobile-money
	- /v2.0/reference/create-transfer-recipient-as-lenco-money
	- /v2.0/reference/create-transfer-recipient-as-lenco-merchant
- Transfers
	- /v2.0/reference/get-transfers
	- /v2.0/reference/get-transfer-by-id
	- /v2.0/reference/get-transfer-by-reference
	- /v2.0/reference/initiate-transfer-to-bank-account
	- /v2.0/reference/initiate-transfer-to-mobile-money
	- /v2.0/reference/initiate-transfer-to-lenco-money
	- /v2.0/reference/initiate-transfer-to-lenco-merchant
	- /v2.0/reference/initiate-transfer-to-account
- Collections
	- /v2.0/reference/get-collections
	- /v2.0/reference/get-collection-by-id
	- /v2.0/reference/get-collection-by-reference
	- /v2.0/reference/initiate-collection-from-mobile-money
	- /v2.0/reference/initiate-collection-from-card
- Settlements
	- /v2.0/reference/get-settlements
	- /v2.0/reference/get-settlement-by-id
- Transactions
	- /v2.0/reference/get-transactions
	- /v2.0/reference/get-transaction-by-id
- Point of Sale
	- /v2.0/reference/get-assigned-pos-terminals
- Encryption
	- /v2.0/reference/encryption
	- /v2.0/reference/get-encryption-key

### v2: migrated so far

 - /docs/v2.0/get-banks — added
 - /docs/v2.0/get-collection-by-id — added
 - /docs/v2.0/get-collection-by-reference — added
 - /docs/v2.0/initiate-collection-from-mobile-money — added
 - /docs/v2.0/initiate-collection-from-card — added
 - /docs/v2.0/get-transactions — added
 - /docs/v2.0/get-transaction-by-id — added
 - /docs/v2.0/get-settlements — added
 - /docs/v2.0/get-settlement-by-id — added
 - /docs/v2.0/webhooks — added
 - /docs/v2.0/encryption — added
 - /docs/v2.0/get-encryption-key — added
 - /docs/v2.0/pricing — added
 - /docs/v2.0/get-account-by-id — added
 - /docs/v2.0/get-account-balance — added
 - /docs/v2.0/get-pos-transaction-by-id — added
 - /docs/v2.0/assign-pos-terminal — added
 - /docs/v2.0/repush-pos-transaction-webhook — added
Done — these pages are part of the repo now (see content/docs/v2.0/). Continue migrating remaining v2 subpages and POST endpoints.

Notes:
- Many of the above show "Show subpages" in the ReadMe UI — we will fetch each section and list subpage slugs as the next step.

---

## v1 (legacy) — https://lenco-api.readme.io/reference/introduction

Top-level sections found on the v1 introduction page:

- Introduction — /reference/introduction (landing)
- Getting Started — /reference/get-started
- Accounts — /reference/get-accounts (has subpages)
- Recipients — /reference/get-recipients (has subpages)
- Banks — /reference/get-banks (has subpages)
- Resolve — /reference/resolve-account (has subpages)
- Transactions — /reference/get-transactions (has subpages)
- Virtual Accounts — /reference/create-virtual-accounts (has subpages)
- Bill Payments — /reference/bill-payments
- Point of Sale — /reference/get-assigned-pos-terminals (has subpages)
- Webhooks — /reference/webhooks
- Pricing — /reference/pricing

### v1: subpages (discovered so far)

- Accounts
	- /reference/get-accounts
	- /reference/get-account-by-id
	- /reference/get-account-balance
- Recipients
	- /reference/get-recipients
	- /reference/get-recipient-by-id
	- /reference/create-recipient
- Banks
	- /reference/get-banks
- Resolve
	- /reference/resolve-account
	- various resolve endpoints (mobile-money, etc)
- Transactions
	- /reference/get-transactions
	- /reference/get-transaction-by-id
	- /reference/get-transaction-by-reference
	- /reference/create-transaction
	- transfers + bulk transfer endpoints (legacy slugs)
- Virtual Accounts
	- /reference/create-virtual-accounts
	- /reference/get-static-virtual-accounts
	- /reference/get-virtual-account-by-account-reference
	- /reference/get-virtual-account-transactions
	- /reference/get-virtual-account-transaction-by-id
- Bill Payments
	- /reference/bill-payments
	- /reference/bills-vendors
	- /reference/bills-products
	- /reference/create-bill-payment
- Point of Sale
	- /reference/get-assigned-pos-terminals
	- /reference/get-pos-transactions
- Webhooks
	- /reference/webhooks


---

## Migration plan (serial workflow)

1. For each top-level section in the tracker, fetch the section page and collect its subpages (if any).
2. For each page/subpage: convert HTML → MDX, add frontmatter (title, description, readmeUrl, version), and write to `content/docs/v2/*` or `content/docs/v1.0/*` depending on source.
3. Update or append `content/docs/meta.json` to include the new pages and preserve hierarchy.
4. Run tests and build, fix issues, then open a PR for review.

---

## Next steps

- [ ] Crawl v2: collect subpage slugs per top-level section and append to this tracker.
- [ ] Crawl v1: collect subpage slugs per top-level section and append to this tracker.
- [ ] Begin converting pages for v2 (serialized, section-by-section).

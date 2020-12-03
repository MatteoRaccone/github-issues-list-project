import './App.css';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';
import IssueList from './components/IssueList';
import "react-bootstrap/dist/react-bootstrap.min.js";

const issues = [
  {
      "url": "https://api.github.com/repos/rails/rails/issues/27599",
      "repository_url": "https://api.github.com/repos/rails/rails",
      "labels_url": "https://api.github.com/repos/rails/rails/issues/27599/labels{/name}",
      "comments_url": "https://api.github.com/repos/rails/rails/issues/27599/comments",
      "events_url": "https://api.github.com/repos/rails/rails/issues/27599/events",
      "html_url": "https://github.com/rails/rails/pull/27599",
      "id": 199328180,
      "number": 27599,
      "title": "Fix bug with symbolized keys in .where with nested join (alternative to #27598)",
      "user": {
        "login": "NickLaMuro",
        "id": 314014,
        "avatar_url": "https://avatars.githubusercontent.com/u/314014?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/NickLaMuro",
        "html_url": "https://github.com/NickLaMuro",
        "followers_url": "https://api.github.com/users/NickLaMuro/followers",
        "following_url": "https://api.github.com/users/NickLaMuro/following{/other_user}",
        "gists_url": "https://api.github.com/users/NickLaMuro/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/NickLaMuro/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/NickLaMuro/subscriptions",
        "organizations_url": "https://api.github.com/users/NickLaMuro/orgs",
        "repos_url": "https://api.github.com/users/NickLaMuro/repos",
        "events_url": "https://api.github.com/users/NickLaMuro/events{/privacy}",
        "received_events_url": "https://api.github.com/users/NickLaMuro/received_events",
        "type": "User",
        "site_admin": false
      },
      "labels": [
        {
          "id": 107191,
          "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
          "name": "activerecord",
          "color": "0b02e1",
          "default": false
        },
        {
          "id": 128692,
          "url": "https://api.github.com/repos/rails/rails/labels/needs%20feedback",
          "name": "needs feedback",
          "color": "ededed",
          "default": false
        }
      ],
      "state": "open",
      "locked": false,
      "assignee": {
        "login": "sgrif",
        "id": 1529387,
        "avatar_url": "https://avatars.githubusercontent.com/u/1529387?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/sgrif",
        "html_url": "https://github.com/sgrif",
        "followers_url": "https://api.github.com/users/sgrif/followers",
        "following_url": "https://api.github.com/users/sgrif/following{/other_user}",
        "gists_url": "https://api.github.com/users/sgrif/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/sgrif/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/sgrif/subscriptions",
        "organizations_url": "https://api.github.com/users/sgrif/orgs",
        "repos_url": "https://api.github.com/users/sgrif/repos",
        "events_url": "https://api.github.com/users/sgrif/events{/privacy}",
        "received_events_url": "https://api.github.com/users/sgrif/received_events",
        "type": "User",
        "site_admin": false
      },
      "assignees": [
        {
          "login": "sgrif",
          "id": 1529387,
          "avatar_url": "https://avatars.githubusercontent.com/u/1529387?v=3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sgrif",
          "html_url": "https://github.com/sgrif",
          "followers_url": "https://api.github.com/users/sgrif/followers",
          "following_url": "https://api.github.com/users/sgrif/following{/other_user}",
          "gists_url": "https://api.github.com/users/sgrif/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sgrif/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sgrif/subscriptions",
          "organizations_url": "https://api.github.com/users/sgrif/orgs",
          "repos_url": "https://api.github.com/users/sgrif/repos",
          "events_url": "https://api.github.com/users/sgrif/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sgrif/received_events",
          "type": "User",
          "site_admin": false
        }
      ],
      "milestone": null,
      "comments": 2,
      "created_at": "2017-01-07T01:05:51Z",
      "updated_at": "2017-01-07T01:15:38Z",
      "closed_at": null,
      "pull_request": {
        "url": "https://api.github.com/repos/rails/rails/pulls/27599",
        "html_url": "https://github.com/rails/rails/pull/27599",
        "diff_url": "https://github.com/rails/rails/pull/27599.diff",
        "patch_url": "https://github.com/rails/rails/pull/27599.patch"
      },
      "body": "Summary\n-------\nIn https://github.com/rails/rails/pull/25146, code was added to fix making where clauses against tables with an `enum` column with a `join` present as part of the query.  As part of this fix, it called `singularize` on the `table_name` variable that was passed into the `associated_table` method.\n\n`table_name`, in some circumstances, can also be a symbol if more than one level of joins exists in the Relation (i.e `joins(:book => :subscription)`).  This fixes that by adding chaning the `.stringify_keys!` (found in `ActiveRecord::Relation::WhereClauseFactory`) to be a `.deep_stringify_keys!` to stringfy keys at all levels.\n\n\nOther Information\n-----------------\nThis bug only surfaces when a join is made more than 1 level deep since the `where_clause_builder` calls `stringify_keys!` on the top level of the `.where` hash:\n\nhttps://github.com/rails/rails/blob/21e5fd4/activerecord/lib/active_record/relation/where_clause_factory.rb#L16\n\nSo this hides this edge case from showing up in the test suite with the current coverage and the test that was in PR #25146.\n\nThis is the alternative to https://github.com/rails/rails/pull/27598 in which the change from PR #25146 was fixed in isolation.  Instead, here we fix the false assumption that all `table_name` values being passed into `.associated_table` are a string.  This might have wider effects because of that, so that should be considered when reviewing."
    }
  ];

function App() {
  return (
    <div className="App">
      <Header />
      <div className ="sub-header">
      <SubHeader/>
      </div>
      <div class="issues-container container">
      <IssueList
      issues = {issues}
      />
      </div>
      <Footer />
    </div>
    );
  }
  
  export default App;
  
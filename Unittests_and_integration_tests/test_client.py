#!/usr/bin/env python3

"""Test fixtures"""

from unittest.mock import patch, PropertyMock
import unittest
from parameterized import parameterized, parameterized_class
from client import GithubOrgClient
from requests.exceptions import HTTPError
from fixtures import TEST_PAYLOAD


class TestGithubOrgClient(unittest.TestCase):
    """Test class for GithubOrgClient"""

    @parameterized.expand([
        ("google"),
        ("abc"),
    ])
    @patch('client.get_json')
    def test_org(self, test_org_name, mock_get_json):
        """Test GithubOrgClient.org"""
        mock_get_json.return_value = {"payload": True}
        client = GithubOrgClient(test_org_name)
        self.assertEqual(client.org, {"payload": True})
        mock_get_json.assert_called_once()

    def test_public_repos_url(self):
        """Test GithubOrgClient._public_repos_url"""
        with patch('client.GithubOrgClient.org',
                   new_callable=PropertyMock) as mock_org:
            mock_org.return_value = {"repos_url": "http://testurl.com"}
            client = GithubOrgClient("test")
            self.assertEqual(client._public_repos_url, "http://testurl.com")

    @patch('client.get_json')
    def test_public_repos(self, mock_get_json):
        """ Test GithubOrgClient.public_repos """
        mock_get_json.return_value = [
            {"name": "repo1"},
            {"name": "repo2"},
        ]
        with patch.object(
            GithubOrgClient,
            '_public_repos_url',
            new_callable=PropertyMock
        ) as mock_public_repos_url:
            mock_public_repos_url.return_value = "www.yes.com"
            test_class = GithubOrgClient("test")
            result = test_class.public_repos()
            self.assertEqual(result, ["repo1", "repo2"])
            mock_public_repos_url.assert_called_once()
            mock_get_json.assert_called_once()

    @parameterized.expand([
        ({'license': {'key': 'my_license'}}, 'my_license', True),
        ({'license': {'key': 'other_license'}}, 'my_license', False),
    ])
    def test_has_license(self, repo, license_key, expected):
        """Test GithubOrgClient.has_license"""
        self.assertEqual(GithubOrgClient.has_license(repo, license_key),
                         expected)


class TestIntegrationGithubOrgClient(unittest.TestCase):
    """Test class for GithubOrgClient.public_repos"""

    @classmethod
    def setUpClass(cls):
        """Set up class"""
        cls.get_patcher = patch('requests.get', side_effect=HTTPError)
        cls.get_patcher.start()

    @classmethod
    def tearDownClass(cls):
        """Tear down class"""
        cls.get_patcher.stop()

    def test_public_repos(self):
        """Test GithubOrgClient.public_repos"""
        client = GithubOrgClient("test")
        self.assertEqual(client.public_repos(), [])
        self.get_patcher.stop()

# -*- encoding: utf-8 -*-
# stub: algolia_html_extractor 2.6.4 ruby lib

Gem::Specification.new do |s|
  s.name = "algolia_html_extractor".freeze
  s.version = "2.6.4".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tim Carry".freeze]
  s.date = "2021-01-06"
  s.description = "Take any arbitrary HTML as input and extract its content as a list of records, including contents and hierarchy.".freeze
  s.email = "tim@pixelastic.com".freeze
  s.homepage = "https://github.com/algolia/html-extractor".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Convert HTML content into Algolia records".freeze

  s.installed_by_version = "3.5.22".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<json>.freeze, ["~> 2.0".freeze])
  s.add_runtime_dependency(%q<nokogiri>.freeze, ["~> 1.10".freeze])
  s.add_development_dependency(%q<coveralls>.freeze, ["~> 0.8.21".freeze])
  s.add_development_dependency(%q<flay>.freeze, ["~> 2.6".freeze])
  s.add_development_dependency(%q<flog>.freeze, ["~> 4.3".freeze])
  s.add_development_dependency(%q<guard>.freeze, ["~> 2.14".freeze])
  s.add_development_dependency(%q<guard-rake>.freeze, ["~> 1.0".freeze])
  s.add_development_dependency(%q<guard-rspec>.freeze, ["~> 4.6".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0".freeze])
  s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.51".freeze])
  s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.14.1".freeze])
end

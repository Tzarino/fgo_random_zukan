require 'open-uri'
require 'nokogiri'
require 'json'

url = "https://www.wicurio.com/grand_order/index.php?%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7"
res = URI.open(url)
body = res.read
charset = res.charset
html = Nokogiri::HTML.parse(body, url = nil, encoding = charset)

a = html.css('.ie5>table>tbody').children

zukan_no = 1
zukan = {}
a.each do |node|
  tb_contents = node.children
  first_content = tb_contents[0]
  first_class = first_content.classes[0]
  if(first_class == "style_th" && first_content.content.to_i == zukan_no)
    zukan[zukan_no] = tb_contents[3].children[0].content
    zukan_no += 1
  end
end

File.open('zukan.json','w') do |f|
  f.puts(JSON.pretty_generate(zukan))
end
<div class="${baseClass}">
    <div class="datepicker-days">
        <table class=" table-condensed">
            <thead>
            <tr>
                <th class="prev"><i class="icon-arrow-left"/></th>
                <th colspan="5" class="switch"></th>
                <th class="next"><i class="icon-arrow-right"/></th>
            </tr>
            <tr data-dojo-attach-point="daysOfWeekNode"></tr>
            </thead>
            <tbody data-dojo-attach-point="daysNode"></tbody>
        </table>
    </div>
    <div class="datepicker-months">
        <table class="table-condensed">
            <thead>
            <tr>
                <th class="prev"><i class="icon-arrow-left"/></th>
                <th class="switch"></th>
                <th class="next"><i class="icon-arrow-right"/></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan="3" data-dojo-attach-point="monthsNode"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="datepicker-years">
        <table class="table-condensed">
            <thead>
            <tr>
                <th class="prev"><i class="icon-arrow-left"/></th>
                <th class="switch" data-dojo-attach-point="yearsNodeHeader"></th>
                <th class="next"><i class="icon-arrow-right"/></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan="3" data-dojo-attach-point="yearsNode"></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>